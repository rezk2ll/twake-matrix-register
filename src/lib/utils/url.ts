import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_OIDC_PROVIDER } from '$env/static/public';
import type { ApplicationType } from '../../types';
import { isMobile } from './device';
import { getApplicationDeepLink, getApplicationGotoLink, getApplicationStoreUrl } from './product';
import { encode as base64url } from 'universal-base64url';

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
export const openRedirectLink = (redirect: string, app: ApplicationType): void => {
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

	redirectToOidc(url.toString());
};

/**
 * opens the application link.
 *
 * @param {ApplicationType} app - The application to open.
 */
export const attemptToOpenApp = (app: ApplicationType): void => {
	if (!browser) return;

	const link = getApplicationGotoLink(app);

	redirectToOidc(link);

	if (isMobile()) {
		const appStoreUrl = getApplicationStoreUrl(app);

		if (appStoreUrl && appStoreUrl.url) {
			setTimeout(() => {
				navigator.clipboard.writeText(link).catch(console.error);

				window.location.href = appStoreUrl.url;
			}, 250);
		}
	}
};

/**
 * redirects to the oidc provider
 *
 * @param {string} url - the final url
 */
export const redirectToOidc = (url: string): void => {
	goto(`${PUBLIC_OIDC_PROVIDER}?redirectUrl=${url}`);
};
