import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { password } = await request.json();
	const { data } = locals.session;

	if (!data.otp_request_token || !password || !data.phone) {
		throw error(400, 'Malformed request');
	}

	await locals.session.set({
		...data,
		verified: true
	});

	return new Response('ok', { status: 200 });
};
