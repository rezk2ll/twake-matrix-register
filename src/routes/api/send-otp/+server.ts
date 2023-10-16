import { generate, send } from '$lib/services/otp';
import { checkPhoneAvailability } from '$lib/services/user';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isPhoneValid } from '$lib/utils/phone';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();
	const { phone } = body;

	if (!isPhoneValid(phone)) {
		throw error(400, 'Invalid phone number');
	}

	if (!(await checkPhoneAvailability(phone))) {
		throw error(400, 'Phone number is already in use');
	}

	const code = generate();

	await send(code, phone);
	await locals.session.set({ code, phone, verified: false, authenticated: false });

	return new Response('ok', { status: 200 });
};
