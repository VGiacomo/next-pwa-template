import React, { useState, useEffect } from 'react'
import { Message, HomeProps } from './types'
import { authorize, listMessages } from '../services/gmailService'
import { Buffer } from 'buffer'
import Page from '@/components/page'
import Section from '@/components/section'

export async function getServerSideProps() {
	let messages: Message[] = []
	try {
		const authRes = await authorize()
		messages = await listMessages(authRes)
	} catch (error) {
		console.log(error)
	}

	// Pass data to the page via props
	return {
		props: {
			emails: messages,
		},
	}
}

function base64DecodeUnicode(str: any) {
	// Convert Base64 encoded bytes to percent-encoding, and then get the original string.
	// Decode the base64-encoded string
	const decodedString = Buffer.from(str, 'base64').toString('utf8')
	return decodedString
}

function Inbox({ emails }: HomeProps) {
	const [emailDataToShow, setEmailDataToShow] = useState({
		id: '',
		content: '',
	})
	console.log(emails)

	function onClickedTitle(emailId: string, emailContent: string) {
		emailDataToShow.id !== emailId
			? setEmailDataToShow({
					id: emailId,
					content: emailContent,
			  })
			: setEmailDataToShow({ id: '', content: '' })
	}

	return (
		<Page>
			<Section>
				<div>
					List of emails :
					<ul>
						{emails.map((email) => (
							<li key={email.id}>
								<div
									onClick={() =>
										onClickedTitle(
											email.id,
											base64DecodeUnicode(email.payload.parts[1].body.data)
										)
									}
								>
									{email.snippet}
								</div>
								{emailDataToShow?.id === email.id && (
									<div
										dangerouslySetInnerHTML={{
											__html: emailDataToShow.content,
										}}
									></div>
								)}
							</li>
						))}
					</ul>
					{
						// display the content of each email as html content
						/* <ul>
				{emails.map((email) => (
					<li key={email.id} style={{backgroundColor: 'white', width: 'auto'}}>
						<div dangerouslySetInnerHTML={{ __html: base64DecodeUnicode(email.payload.parts[1].body.data) }}></div>
						
						{' '}
						---------
						-----------
						{' '}
					</li>
				))}
			</ul> */
					}
				</div>
			</Section>
		</Page>
	)
}

export default Inbox
