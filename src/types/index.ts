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

export interface AuthAPIResponse {
	error: string;
	result: number;
}

export interface AuthResponse extends AuthAPIResponse {
	id: string;
}

export interface TokenResponse extends AuthAPIResponse {
	token: string;
}

export type Tab = "register" | "login"

export type PasswordType = "text" | "password"
