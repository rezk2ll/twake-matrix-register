import { redirect, type Actions, error, fail, Redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { checkEmailAvailability, checkNickNameAvailability, signup } from '$lib/services/user';
import { validatePassword } from '$lib/utils/password';
import { validateEmail } from '$lib/utils/email';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session.phone) {
		throw redirect(302, '/register');
	}

	if (!session.verified) {
		throw redirect(302, '/register/otp');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const nickname = data.get('nickname') as string;
			const displayName = (data.get('displayName') as string) ?? '';
			const recoveryEmail = (data.get('recovery_email') as string) ?? '';
			const password = (data.get('password') as string) ?? '';

			const { phone, verified } = locals.session.data;

			if (!phone || !verified) {
				return error(500);
			}

			if (!nickname) {
				return fail(400, { nickname, missing: true });
			}

			if (!password || !validatePassword(password)) {
				return fail(400, { invalid_password: true });
			}

			if (recoveryEmail) {
				if (validateEmail(recoveryEmail) === false) {
					return fail(400, { email_invalid: true });
				}

				if ((await checkEmailAvailability(recoveryEmail)) === false) {
					return fail(400, { email_unavailable: true });
				}
			}

			if ((await checkNickNameAvailability(nickname)) === false) {
				return fail(400, { nickname, taken: true });
			}
			await signup(nickname, phone, password, displayName, recoveryEmail);

			await locals.session.set({
				registered: true,
				code: null,
				phone: null,
				verified: false,
				user: nickname
			});

			throw redirect(302, '/register/success');
		} catch (err) {
			if ((err as Redirect).location) {
				throw err;
			}

			return fail(500, { error: true });
		}
	}
};
