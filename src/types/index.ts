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
