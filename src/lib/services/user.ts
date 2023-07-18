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
		console.log(error);

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
		console.log(error);

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
	displayName?: string,
	mail?: string
): Promise<void> => {
	try {
		const entry: User = {
			uid: cn,
			cn,
			sn: cn,
			mobile,
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
		console.log(error);
	}
};
