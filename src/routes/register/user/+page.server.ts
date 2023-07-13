import { redirect, type Actions, error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { checkNickNameAvailability, signup } from '$lib/services/user';

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

			const { phone, verified } = locals.session.data;

			if (!phone || !verified) {
				return error(500);
			}

			if (!nickname) {
				return fail(400, { nickname, missing: true });
			}

			if ((await checkNickNameAvailability(nickname)) === false) {
				return fail(400, { nickname, taken: true });
			}

			await signup(nickname, phone, displayName, recoveryEmail);

			return {
				sucess: true
			};
		} catch (err) {
			return error(500);
		}
	}
};
