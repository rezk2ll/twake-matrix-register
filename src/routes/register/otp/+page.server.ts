import { maskPhone } from '$lib/utils/phone';
import { redirect, type Actions, Redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (session.verified) {
		throw redirect(302, '/register/user');
	}

  if (!session.phone) {
    throw redirect(302, '/register');
  }

	return {
		mask: maskPhone(session.phone)
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const password = data.get('password');
			const code = locals.session.data.code;

			if (!password || !code) {
				return fail(400, { code, incorrect: true });
			}

			if (code === password) {
				await locals.session.update((data) => ({
					...data,
					verified: true
				}));

				throw redirect(302, '/register/user');
			}

			return fail(400, { code, incorrect: true });
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}

			return fail(500, { error: true });
		}
	}
};
