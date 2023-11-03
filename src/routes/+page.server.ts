import type { Actions, PageServerLoad } from './$types';
import Client from '$lib/services/ldap/client';
import { type Redirect, fail, redirect } from '@sveltejs/kit';
import { isPhoneValid } from '$lib/utils/phone';
import { validatePassword } from '$lib/utils/password';
import {
	checkNickNameAvailability,
	fetchUser,
	signup,
	suggestAlternativeAvaialableNickNames
} from '$lib/services/user';
import { validateName, validateNickName } from '$lib/utils/username';
import authService from '$lib/services/auth';
import { extractMainDomain } from '$lib/utils/url';

export const load: PageServerLoad = async ({ locals, url }) => {
	await Client.getClient();

	const { session } = locals;
	const redirectUrl = url.searchParams.get('post_registered_redirect_url') ?? null;

	if (redirectUrl) {
		await session.update((data) => ({
			...data,
			redirectUrl
		}));
	}

	if (session.data.authenticated === true) {
		throw redirect(302, '/success');
	}
};

export const actions: Actions = {
	sendOtp: async ({ request, locals }) => {
		const data = await request.formData();
		const phone = data.get('phone') as string;

		if (!phone) {
			return fail(400, { phone, missing: true });
		}

		if (!isPhoneValid(phone)) {
			return fail(400, { phone, invalid: true });
		}

		const token = 'demo';

		await locals.session.set({
			otp_request_token: token,
			last_sent: Date.now(),
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

		if (!password || !session.data.otp_request_token) {
			return fail(400, { incorrect: true });
		}

		await locals.session.update((data) => ({
			...data,
			verified: true
		}));

		return { verified: true };
	},

	register: async ({ request, locals, cookies, url }) => {
		try {
			const data = await request.formData();
			const phone = data.get('phone') as string;

			if (!phone || isPhoneValid(phone) === false) {
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
				otp_request_token: null,
				last_sent: null,
				phone,
				verified: false,
				user: nickname,
				firstName,
				lastName
			});

			const authSessionCookie = await authService.login(nickname, password);

			cookies.set(authService.cookieName, authSessionCookie, {
				domain: extractMainDomain(url.host)
			});

			throw redirect(302, '/success');
		} catch (err) {
			if ((err as Redirect).location) {
				throw err;
			}

			console.error({ err });

			return fail(500, { error: true });
		}
	},

	login: async ({ request, locals, cookies, url }) => {
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

			cookies.set(authService.cookieName, cookie, { domain: extractMainDomain(url.host) });

			throw redirect(302, '/success');
		} catch (err) {
			if ((err as Redirect).location) {
				throw err;
			}

			console.error({ err });

			return fail(500, { failed_login: true });
		}
	}
};
