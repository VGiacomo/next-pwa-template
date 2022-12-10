import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Message, HomeProps } from './types'
import { authorize, listMessages } from '../services/gmailService'

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

function Inbox({ emails }: HomeProps) {
	console.log(emails)

	return (
		<div>
			List of emails :
			<ul>
				{emails.map((email) => (
					<li key={email.id}>{email.snippet}</li>
				))}
			</ul>
		</div>
	)
}

export default Inbox
