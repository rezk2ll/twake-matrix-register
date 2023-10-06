import { derived, writable, get } from 'svelte/store';
import type { ActionData } from '../routes/$types';

export const form = writable<ActionData>();

export const verified = writable<boolean>(false);

export const phone = writable<string>('');

export const verifiedPhones = writable<string[]>([]);

verified.subscribe((v) => {
	if (v === true) {
		verifiedPhones.update((phones) => [...phones, get(phone)]);
	}
});

phone.subscribe((v) => {
	if (get(verifiedPhones).includes(v)) {
		verified.set(true);
	} else {
		verified.set(false);
	}
});

export const der = derived(verified, ($verified) => $verified);
