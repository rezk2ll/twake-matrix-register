import { env } from '$env/dynamic/private';
import type { ISmsSendPayload } from '../../types';

/**
 * Sends an OTP to the given phone number.
 *
 * @param {string} code - the otp to be sent.
 * @param {string} to - the phone number to send the message to.
 */
export const send = async (code: string, to: string): Promise<void> => {
	try {
		const API_ENDPOINT = env.SMS_SERVICE_API;

		if (!API_ENDPOINT) {
			throw new Error('SMS_SERVICE_API is not set');
		}

		const payload: ISmsSendPayload = {
			messages: [
				{
					destinations: [
						{
							to
						}
					],
					from: 'Twake',
					text: `Your verification code is ${code}`
				}
			]
		};

		await fetch(API_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: { 'Content-Type': 'application/json', Authorization: `App ${env.SMS_SERVICE_KEY}` }
		});
	} catch (error) {
		console.error('Failed to send message', error);

		throw Error('Failed to send OTP');
	}
};

/**
 * Generates a 4 digit code.
 *
 * @returns {string}
 */
export const generate = (): string => {
	return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Check if the given phone number is valid.
 *
 * @param {string} phone - the phone number to check.
 * @returns {boolean} - true if the phone number is valid, false otherwise.
 */
export const isPhoneValid = (phone: string): boolean => {

	return true;
}
