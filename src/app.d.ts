// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			session: import('svelte-kit-cookie-session').Session<SessionData>;
		}

		interface PageData {
			session: SessionData;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

interface SessionData {
	phone: string | null;
	code: string | null;
	verified: boolean = false;
	registered: boolean = false;
	user?: string;
	firstName?: string;
	lastName?: string;
}
