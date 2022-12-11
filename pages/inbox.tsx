import React, { useState, useEffect } from 'react'
import { Message, HomeProps } from './types'
import { authorize, listMessages } from '../services/gmailService'
import { Buffer } from 'buffer'
import Page from '@/components/page'
import Section from '@/components/section'
import he from 'he'

// mantine imports
import {
	Accordion,
	ActionIcon,
	AccordionControlProps,
	Box,
} from '@mantine/core'
// import { IconDots } from '@tabler/icons';

function AccordionControl(props: AccordionControlProps) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Accordion.Control {...props} />
			<ActionIcon size='lg'>{/* <IconDots size={16} /> */}</ActionIcon>
		</Box>
	)
}

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
	// Decode the base64-encoded string
	const decodedString = Buffer.from(str, 'base64').toString('utf8')
	return decodedString
}

function Inbox({ emails }: HomeProps) {
	console.log(emails)

	return (
		<Page>
			<Section>
				List of emails :
				<Accordion chevronPosition='left' sx={{ maxWidth: 'auto' }} mx='auto'>
					{emails.map((email) => (
						<Accordion.Item value={email.id}>
							<AccordionControl>{he.decode(email.snippet)}</AccordionControl>
							<Accordion.Panel>
								{
									<div
										dangerouslySetInnerHTML={{
											__html: base64DecodeUnicode(
												email.payload.parts[1].body.data
											),
										}}
									></div>
								}
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			</Section>
		</Page>
	)
}

export default Inbox
