import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session.registered) {
		throw redirect(302, '/');
	}

	return {
		user: session.user
	};
};