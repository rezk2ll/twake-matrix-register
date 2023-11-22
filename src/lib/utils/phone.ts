import validator from 'validator';

/**
 * Masks a phone number.
 *
 * @param {string} phone - The phone number to mask.
 * @returns {string} - the masked phone number.
 */
export const maskPhone = (phone: string): string => {
	return phone.replace(/(?<=^\+\d{1,3}\d{2})\d+(?=\d$)/, '*****');
};

/**
 * Check if the given phone number is valid.
 *
 * @param {string} phone - the phone number to check.
 * @returns {boolean} - true if the phone number is valid, false otherwise.
 */
export const isPhoneValid = (phone: string): boolean => {
	return validator.isMobilePhone(phone);
};
