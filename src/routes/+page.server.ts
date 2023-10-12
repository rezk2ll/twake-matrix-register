import type { Actions, PageServerLoad } from './$types';
import Client from '$lib/services/ldap/client';
import { generate } from '$lib/services/otp';
import { Redirect, fail, redirect } from '@sveltejs/kit';
import { isPhoneValid } from '$lib/utils/phone';
import { validatePassword } from '$lib/utils/password';
import {
	checkNickNameAvailability,
	checkPhoneAvailability,
	fetchUser,
	signup,
	suggestAlternativeAvaialableNickNames
} from '$lib/services/user';
import { validateName, validateNickName } from '$lib/utils/username';
import authService from '$lib/services/auth';

export const load: PageServerLoad = async ({ parent }) => {
	await Client.getClient();

	const { session } = await parent();

	if (session.authenticated === true) {
		throw redirect(302, '/success');
	}
};

export const actions: Actions = {
	sendOtp: async ({ request, locals }) => {
		const data = await request.formData();
		const code = generate();
		const phone = data.get('phone') as string;

		console.log({ phone });

		if (!phone) {
			return fail(400, { phone, missing: true });
		}

		if (!isPhoneValid(phone)) {
			return fail(400, { phone, invalid: true });
		}

		console.log({ code });

		await locals.session.set({
			code,
			phone,
			verified: false,
			authenticated: false
		});

		return { sent: true };
	},

	checkOtp: async ({ request, locals }) => {
		const data = await request.formData();
		const password = data.get('password') as string;
		const { session } = locals;

		if (!session.data.phone) {
			return fail(400, { missing: true });
		}

		if (!password || !session.data.code) {
			return fail(400, { incorrect: true });
		}

		if (session.data.code === password) {
			await locals.session.update((data) => ({
				...data,
				verified: true
			}));

			return { verified: true };
		} else {
			await locals.session.update((data) => ({
				...data,
				verified: false
			}));
			return fail(400, { incorrect: true });
		}
	},

	register: async ({ request, locals, cookies }) => {
		try {
			const data = await request.formData();
			const { session } = locals;
			const phone = data.get('phone') as string;
			const { phone: verifiedPhone } = session.data;

			if (!phone || isPhoneValid(phone) === false || !(await checkPhoneAvailability(phone))) {
				return fail(400, { invalid_phone: true });
			}

			if (!session.data.verified || verifiedPhone !== phone) {
				return fail(400, { invalid_phone: true });
			}

			const nickname = data.get('nickname') as string;
			const firstName = data.get('firstname') as string;
			const lastName = data.get('lastname') as string;
			const password = data.get('password') as string;

			if (!password || !validatePassword(password)) {
				return fail(400, { invalid_password: true });
			}

			if (validateNickName(nickname) === false) {
				return fail(400, { invalid_nickname: true });
			}

			if ((await checkNickNameAvailability(nickname)) === false) {
				const alternatives = await suggestAlternativeAvaialableNickNames(
					firstName,
					lastName,
					nickname
				);

				return fail(400, { nickname_taken: true, alternative_nicknames: alternatives });
			}

			if (validateName(firstName) === false) {
				return fail(400, { invalid_firstname: true });
			}

			if (validateName(lastName) === false) {
				return fail(400, { invalid_lastname: true });
			}

			await signup(nickname, phone, password, firstName, lastName);

			await locals.session.set({
				authenticated: true,
				code: null,
				phone: null,
				verified: false,
				user: nickname,
				firstName,
				lastName
			});

			const authSessionCookie = await authService.login(nickname, password);

			cookies.set(authService.cookieName, authSessionCookie);

			throw redirect(302, '/success');
		} catch (err) {
			if ((err as Redirect).location) {
				throw err;
			}

			return fail(500, { error: true });
		}
	},

	login: async ({ request, locals, cookies }) => {
		try {
			const data = await request.formData();

			const login = data.get('login') as string;
			const password = data.get('password') as string;

			const cookie = await authService.login(login, password);

			if (!cookie) {
				return fail(400, { failed_login: true });
			}

			const user = await fetchUser(login);

			if (!user) {
				throw Error('User not found');
			}

			await locals.session.update((data) => ({
				...data,
				authenticated: true,
				lastName: user?.sn,
				firstName: user?.givenName,
				user: user?.cn
			}));

			cookies.set(authService.cookieName, cookie);

			throw redirect(302, '/success');
		} catch (err) {
			if ((err as Redirect).location) {
				throw err;
			}

			return fail(500, { failed_login: true });
		}
	}
};
