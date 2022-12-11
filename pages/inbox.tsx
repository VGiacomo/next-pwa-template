import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Message, HomeProps } from './types'
import { authorize, listMessages } from '../services/gmailService'
import { atob, Buffer } from 'buffer'

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
  const decodedString = Buffer.from(str, 'base64').toString('utf8');
	return decodedString
}

function Inbox({ emails }: HomeProps) {
	console.log(emails)
	let decodedString: string = ''

	return (
		<div>
			List of emails :
			{/* <ul>
				{emails.map((email) => (
					<li key={email.id}>{email.snippet}</li>
				))}
			</ul> */}
			<ul>
				{emails.map((email) => (
					<li key={email.id} style={{backgroundColor: 'white', width: 'auto'}}>
						<div dangerouslySetInnerHTML={{ __html: base64DecodeUnicode(email.payload.parts[1].body.data) }}></div>
						
						{' '}
						---------
						-----------
						{' '}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Inbox
