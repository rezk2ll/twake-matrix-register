/**
 * Checks if a nickname is available.
 *
 * @param {string} nickName - the nickname to check
 * @returns {Promise<boolean>} - true if the nickname is available, false otherwise
 */
export const checkNickNameAvailability = async (nickName: string): Promise<boolean> => {
	return false;
};

/**
 * Signs up a user to TOM.
 *
 * @param {string} nickName - the nickname of the user. 
 * @param {string} phone - the phone of the user.
 * @param {string} displayName - the display name of the user.
 * @param {string} recoveryEmail - the email to send the recovery email to. 
 * @returns 
 */
export const signup = async (
	nickName: string,
	phone: string,
	displayName?: string,
	recoveryEmail?: string
): Promise<void> => {
	return;
};
