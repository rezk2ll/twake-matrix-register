import { generate, send } from '$lib/services/otp';
import { Redirect, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { checkPhoneAvailability } from '$lib/services/user';
import { isPhoneValid } from '$lib/utils/phone';

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

			if (!(await checkPhoneAvailability(phone))) {
				return fail(400, { phone, taken: true });
			}

			// await send(code, phone);
			console.log({ code })
			await locals.session.set({
				code,
				phone,
				verified: false,
				registered: false
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
