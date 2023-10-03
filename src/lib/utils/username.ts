/**
 * Validates a name.
 *
 * a valid name must be at least 3 characters long and contain only letters and spaces.
 * @param {string} name - the string to validate.
 * @returns {boolean} - true if the string is valid, false otherwise.
 */
export const validateName = (name: string): boolean => /^[a-zA-Z ]{3,}$/.test(name);

/**
 * Validates a nickname.
 *
 * a valid nickname must be between 3 and 20 characters long and contain only letters and numbers.
 *
 * @param {string} name - the nickname to validate.
 * @returns {boolean} - true if the nickname is valid, false otherwise.
 */
export const validateNickName = (name: string): boolean => /^[a-zA-Z0-9]{3,20}$/.test(name);
