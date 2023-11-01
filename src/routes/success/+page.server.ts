import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session.authenticated) {
		throw redirect(302, '/');
	}

	return {
		username: session.user,
		firstName: session.firstName,
		lastName: session.lastName,
		phone: session.phone,
		redirectUrl: session.redirectUrl ?? null
	};
};
