interface MessagePart {
	partId: string;
	mimeType: string;
	filename: string;
	headers: any[];
	// [
	// 	{
	// 		object(Header)
	// 	}
	// ]
	body: any;
	// {
	// 	object(MessagePartBody)
	// }
	parts: any[];
}
export interface Message {
	id: string;
	threadId: string;
	labelIds: [string];
	snippet: string;
	historyId: string;
	internalDate: string;
	payload: MessagePart;

	sizeEstimate: number;
	raw: string;
}
export interface HomeProps {
	emails: Message[];
}
