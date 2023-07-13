/**
 * Masks a phone number.
 *
 * @param {string} phone - The phone number to mask.
 * @returns {string} - the masked phone number.
 */
export const maskPhone = (phone: string): string => {
	return phone.replace(/(?<=^\+\d{1,3}\d{2})\d+(?=\d$)/, '*****');
};
