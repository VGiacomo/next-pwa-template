import { ObjectId } from 'bson'

interface MessagePart {
	partId: string
	mimeType: string
	filename: string
	headers: any[]
	// [
	// 	{
	// 		object(Header)
	// 	}
	// ]
	body: any
	// {
	// 	object(MessagePartBody)
	// }
	parts: any[]
}
export interface Message {
	id: string
	threadId: string
	labelIds: [string]
	snippet: string
	historyId: string
	internalDate: string
	payload: MessagePart

	sizeEstimate: number
	raw: string
}
export interface HomeProps {
	emails: Message[]
}

export interface Subscription {
	_id: ObjectId
	userId: string
	newsLetterHeaderId: string
	subscriptionDate: Date
}

export interface NewsletterHeader {
	_id: ObjectId
	author: string
	hashPartitionKey: string
	categories: string[]
	nbSuscribers: number
	description: string
	title: string
	cover: string
	from: string
}
