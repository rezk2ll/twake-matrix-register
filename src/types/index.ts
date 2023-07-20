export interface ISmsSendPayload {
	messages: Message[];
}

export interface Message {
	destinations: Destination[];
	from: string;
	text: string;
}

export interface Destination {
	to: string;
}

export type SearchResult = Record<string, string | string[] | number>;

export interface User {
	uid: string;
	cn: string;
	sn: string;
	userPassword: string;
	displayName?: string;
	mobile: string;
	mail?: string;
	objectclass: 'inetOrgPerson';
}
