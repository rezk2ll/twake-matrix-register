import { browser } from '$app/environment';
import type { ApplicationType } from '../../types';
import { getApplicationDeepLink, getApplicationStoreUrl } from './device';
import base64url from 'base64url';

/**
 * formats a url by adding a trailing slash if it doesn't have one
 *
 * @param {string} url - the url to check
 * @returns {string} - the url with a trailing slash if it doesn't have one
 */
export const getUrl = (url: string): string => (url.endsWith('/') ? url : `${url}/`);

/**
 * Extracts the domain name from a subdomain string.
 *
 * @param {string} subdomain - The input subdomain string.
 * @returns {string} The extracted domain name.
 */
export const extractMainDomain = (subdomain: string): string => {
	const match = subdomain.match(/[^.]+.[^.]+$/);

	if (match) {
		return match[0];
	}

	return subdomain;
};

/**
 * Opens the redirect deep link.
 * 
 * @param {string} redirect - The redirect url.
 * @param {ApplicationType} app - The application to open.
 */
export const openAppDeepLink = (redirect: string, app: ApplicationType): void => {
	if (!browser) return;

	const url = new URL(redirect);

	const appDeepLink = getApplicationDeepLink(app);
	const appStoreUrl = getApplicationStoreUrl(app);

	if (appDeepLink) {
		url.searchParams.append('open_app', base64url(appDeepLink));
	}

	if (appStoreUrl) {
		url.searchParams.append(appStoreUrl.type, base64url(appStoreUrl.url));
	}

	console.log(url.toString());

	window.location.href = url.toString();
};
