import type { User } from '../../types';
import ldapClient from './ldap/client';

/**
 * Checks if a nickname is available.
 *
 * @param {string} nickName - the nickname to check
 * @returns {Promise<boolean>} - true if the nickname is available, false otherwise
 */
export const checkNickNameAvailability = async (nickName: string): Promise<boolean> => {
	try {
		const existingUser = await ldapClient.find('cn', nickName, ['cn']);

		if (existingUser.length === 0) {
			return true;
		}

		return false;
	} catch (error) {
		console.error('Failed to check nickname availability', { error });

		return false;
	}
};

/**
 * Checks if a phone is available.
 *
 * @param {string} phone - the phone to check for.
 * @returns {Promise<boolean>} - true if the phone is available, false otherwise.
 */
export const checkPhoneAvailability = async (phone: string): Promise<boolean> => {
	try {
		const existingUser = await ldapClient.find('mobile', phone, ['cn']);

		if (existingUser.length === 0) {
			return true;
		}

		return false;
	} catch (error) {
		console.error('Failed to check phone availability', { error });

		return false;
	}
};

/**
 * Checks if an email is available.
 *
 * @param {string} email - the email to check for.
 * @returns {Promise<boolean>} - true if the email is available, false otherwise.
 */
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
	try {
		const existingUser = await ldapClient.find('mail', email, ['cn']);

		if (existingUser.length === 0) {
			return true;
		}

		return false;
	} catch (error) {
		console.error('Failed to check email availability', { error });

		return false;
	}
};

/**
 * Signs up a user
 *
 * @param {string} cn - the nickname of the user.
 * @param {string} mobile - the phone of the user.
 * @param {string} displayName - the display name of the user.
 * @param {string} mail - the email to send the recovery email to.
 */
export const signup = async (
	cn: string,
	mobile: string,
	password: string,
	displayName?: string,
	mail?: string
): Promise<void> => {
	try {
		const entry: User = {
			uid: cn,
			cn,
			sn: cn,
			mobile,
			userPassword: password,
			objectclass: 'inetOrgPerson'
		};

		if (mail) {
			entry.mail = mail;
		}

		if (displayName) {
			entry.displayName = displayName;
		}

		await ldapClient.insert<User>(`cn=${cn},ou=users`, entry);
	} catch (error) {
		console.error('Failed to create user', { error });
	}
};
