import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session.phone) {
		throw redirect(302, '/register');
	}

	if (!session.verified) {
		throw redirect(302, '/register/otp');
	}
};
