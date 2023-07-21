import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validatePassword } from '$lib/utils/password';
import { validateEmail } from '$lib/utils/email';
import {
	checkEmailAvailability,
	checkNickNameAvailability,
	checkPhoneAvailability,
	signup
} from '$lib/services/user';

export const POST: RequestHandler = async ({ request, locals }) => {
	const {
		nickname,
		displayName = null,
		recovery_email: email = null,
		password
	} = await request.json();

	const { phone, verified } = locals.session.data;

	if (!phone || !verified) {
		throw error(401, 'Unauthorized: phone is not verified');
	}

	if (!nickname || !password) {
		throw error(400, 'Bad Request: missing fields');
	}

	if (!password || !validatePassword(password)) {
		throw error(400, 'Bad Request: invalid password');
	}

	if (email) {
		if (!validateEmail(email)) {
			throw error(400, 'Bad Request: invalid email');
		}

		if (!(await checkEmailAvailability(email))) {
			throw error(400, 'Bad Request: email is not available');
		}
	}

	if (!(await checkNickNameAvailability(nickname))) {
		throw error(400, 'Bad Request: nickname is not available');
	}

	if (!(await checkPhoneAvailability(phone))) {
		throw error(400, 'Bad Request: phone is not available');
	}

	await signup(nickname, phone, password, displayName, email);

	await locals.session.set({
		registered: true,
		user: nickname,
		code: null,
		phone: null,
		verified: false
	});

	return new Response('ok', { status: 201 });
};
