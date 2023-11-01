import { browser } from '$app/environment';
import {
	TMAIL_APPSTORE_URL,
	TMAIL_PLAYSTORE_URL,
	TWAKE_APPSTORE_URL,
	TWAKE_PLAYSTORE_URL
} from '$env/static/private';
import type { ApplicationType, IApplicationStorePayload, PlatformType } from '../../types';

/**
 * Detects whether the user is on a mobile device or not.
 *
 * @returns {boolean}
 */
export const isMobile = (): boolean =>
	browser && /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

/**
 * Get the user platform.
 *
 * @returns {PlatformType} The user platform ( server, web, android or ios)
 */
export const getPlatform = (): PlatformType => {
	if (!browser) return 'server';

	if (!isMobile()) return 'web';

	if (navigator.userAgent.match(/Android/i)) return 'android';
	if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) return 'ios';

	return 'web';
};

/**
 * Get the store url for an application.
 *
 * @return {string | undefined}
 */
export const getApplicationStoreUrl = (
	app: ApplicationType
): IApplicationStorePayload | undefined => {
	if (isMobile()) {
		const platform = getPlatform();

		if (platform === 'android' && app === 'tmail') {
			return {
				type: 'play_store_url',
				url: TMAIL_PLAYSTORE_URL
			};
		}

		if (platform === 'android' && app === 'twake') {
			return {
				type: 'play_store_url',
				url: TWAKE_PLAYSTORE_URL
			};
		}

		if (platform === 'ios' && app === 'tmail') {
			return {
				type: 'app_store_url',
				url: TMAIL_APPSTORE_URL
			};
		}

		if (platform === 'ios' && app === 'twake') {
			return {
				type: 'app_store_url',
				url: TWAKE_APPSTORE_URL
			};
		}
	}
};

/**
 * Get the deep link for an application.
 *
 * @return {string | undefined}
 */
export const getApplicationDeepLink = (app: ApplicationType): string | undefined => {
	if (app === 'tdrive') {
		return 'twake.drive://';
	}

	if (app === 'tmail') {
		return 'teammail.mobile://';
	}

	if (app === 'twake') {
		return 'twake.chat://';
	}
};
