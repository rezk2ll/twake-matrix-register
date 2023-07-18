import type { PageServerLoad } from './$types';
import Client from '$lib/services/ldap/client';

export const load: PageServerLoad = async ({ locals }) => {
	await locals.session.destroy();

	await Client.getClient();
};
