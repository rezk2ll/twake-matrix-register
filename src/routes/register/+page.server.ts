import { generate, isPhoneValid, send } from '$lib/services/otp';
import { Redirect, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (session.verified) {
		throw redirect(302, '/register/user');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const code = generate();
			const phone = data.get('phone') as string;

			if (!phone) {
				return fail(400, { phone, missing: true });
			}

			if (!isPhoneValid(phone)) {
				return fail(400, { phone, invalid: true });
			}

			await send(code, phone);

			await locals.session.set({
				code,
				phone,
				verified: false
			});

			throw redirect(302, '/register/otp');
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}

			return fail(500, { error: true });
		}
	}
};
