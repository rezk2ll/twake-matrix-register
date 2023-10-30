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
