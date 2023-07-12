import { generate, send } from '$lib/services/otp';
import { Redirect, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { maskPhone } from '$lib/utils/phone';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (session.verified) {
		throw redirect(302, '/register/user');
	}

	return {
		mask: session.phone ? maskPhone(session.phone) : null
	};
};

export const actions: Actions = {
	otp: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const code = generate();
			const phone = data.get('phone') as string;

			const message = `Your verification code is ${code}`;

			await send(message, phone);

			await locals.session.set({
				code,
				phone,
				verified: false
			});

			return {
				success: true
			};
		} catch (error) {
			return {
				success: false
			};
		}
	},
	check: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const password = data.get('password');
			const code = locals.session.data.code;

			if (code === password) {
				await locals.session.update((data) => ({
					...data,
					verified: true
				}));

				throw redirect(302, '/register/user');
			}

			return {
				failure: true
			};
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}

			return {
				error: true
			};
		}
	}
};
