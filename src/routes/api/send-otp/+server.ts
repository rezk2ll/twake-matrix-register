import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isPhoneValid } from '$lib/utils/phone';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();
	const { phone } = body;

	if (!isPhoneValid(phone)) {
		throw error(400, 'Invalid phone number');
	}

	const token = '123456';

	await locals.session.set({
		otp_request_token: token,
		phone,
		last_sent: Date.now(),
		verified: false,
		authenticated: false
	});

	return new Response('ok', { status: 200 });
};
