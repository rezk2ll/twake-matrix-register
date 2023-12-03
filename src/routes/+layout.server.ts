import { browser } from '$app/environment';
import { getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import type { LayoutServerLoad } from './$types';
import '$lib/i18n';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (browser) {
		locale.set(getLocaleFromNavigator());
	}

	await waitLocale();

	return {
		session: locals.session.data
	};
};
