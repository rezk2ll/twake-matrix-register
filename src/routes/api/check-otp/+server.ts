import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { password } = await request.json();
	const { data } = locals.session;

	if (!locals.session.data.code || !password || !locals.session.data.phone) {
		throw error(400, 'Malformed request');
	}

	if (locals.session.data.code !== password) {
		throw error(400, 'Incorrect password');
	}

	await locals.session.set({
		...data,
		verified: true
	});

	return new Response('ok', { status: 200 });
};
