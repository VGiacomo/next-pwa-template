const fs = require('fs').promises
const next = require('next')
const express = require('express')
const { google } = require('googleapis')
const path = require('path')
const process = require('process')
const { authenticate } = require('@google-cloud/local-auth')

const jwt = require('jsonwebtoken')
const { JWT } = require('google-auth-library')

// const privateKey = require('./nl-app-example-370413-c19e8d82a727.json')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

/////////////////////////////////

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
	try {
		const content = await fs.readFile(TOKEN_PATH)
		const credentials = JSON.parse(content)
		return google.auth.fromJSON(credentials)
	} catch (err) {
		console.log("can't load saved credentials", err)
		return null
	}
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
	const content = await fs.readFile(CREDENTIALS_PATH)
	const keys = JSON.parse(content)
	const key = keys.installed || keys.web
	const payload = JSON.stringify({
		type: 'authorized_user',
		client_id: key.client_id,
		client_secret: key.client_secret,
		refresh_token: client.credentials.refresh_token,
	})
	await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
	let client = await loadSavedCredentialsIfExist()
	if (client) {
		return client
	}
	client = await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH,
	})
	if (client.credentials) {
		await saveCredentials(client)
	}
	return client
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
	const gmail = google.gmail({ version: 'v1', auth })
	const res = await gmail.users.labels.list({
		userId: 'me',
	})
	const labels = res.data.labels
	if (!labels || labels.length === 0) {
		console.log('No labels found.')
		return
	}
	console.log('Labels:')
	labels.forEach((label) => {
		console.log(`- ${label.name}`)
	})
}

/////////////////////////////////////

const auth = new google.auth.GoogleAuth({
	keyFile: CREDENTIALS_PATH,
	scopes: SCOPES,
})

app.prepare().then(() => {
	const server = express()
	authorize().then(listLabels).catch(console.error)
	const gmail = google.gmail({ version: 'v1', auth })

	// Set up the Gmail API client.
	// const jwtClient = new JWT({
	// 	email: privateKey.client_email,
	// 	key: privateKey.private_key,
	// 	scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
	// })

	// // Request an access token for the user's Gmail account.
	// jwtClient.authorize((err, tokens) => {
	// 	if (err) {
	// 		console.error(err)
	// 	} else {
	// 		const accessToken = tokens.access_token

	// 		// Store the access token in a global variable or a session cookie.
	// 		global.accessToken = accessToken
	// 		// or
	// 		// res.cookie('accessToken', accessToken)
	// 	}
	// })

	// Set up the Gmail API client.
	// const gmail = google.gmail({
	// 	version: 'v1',
	// 	auth: 'AIzaSyA_NKFXH7aLknWJWuiB3zrXuM79WrkztKM',
	// })

	// Define an API endpoint that retrieves the emails from the user's inbox.
	server.get('/api/emails', (req, res) => {
		gmail.users.messages.list(
			{
				// auth: jwtClient,
				userId: 'me',
				labelIds: ['INBOX'],
			},
			(err, response) => {
				if (err) {
					res.status(500).send(err)
				} else {
					res.send(response.data.messages)
				}
			}
		)
	})

	async function listEmails(auth) {
		const gmail = google.gmail({ version: 'v1', auth })
		const res = await gmail.users.messages.list(
			{
				userId: 'me',
				labelIds: ['INBOX'],
			},
			(err, response) => {
				if (err) {
					res.status(500).send(err)
				} else {
					res.send(response.data.messages)
				}
			}
		)
		// const labels = res.data.labels
		// if (!labels || labels.length === 0) {
		// 	console.log('No labels found.')
		// 	return
		// }
		// console.log('Labels:')
		// labels.forEach((label) => {
		// 	console.log(`- ${label.name}`)
		// })
	}

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
