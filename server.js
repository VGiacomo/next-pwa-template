const next = require('next')
const express = require('express')
const { google } = require('googleapis')

const jwt = require('jsonwebtoken')
const { JWT } = require('google-auth-library')

const privateKey = require('./nl-app-example-370413-c19e8d82a727.json')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



const auth = new google.auth.GoogleAuth({
	keyFile: './nl-app-example-370413-c19e8d82a727.json',
	scopes: ['https://www.googleapis.com/auth/cloud-platform'],
})

app.prepare().then(() => {
	const server = express()



// Set up the Gmail API client.
const jwtClient = new JWT({
	email: privateKey.client_email,
	key: privateKey.private_key,
	scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
})

// Request an access token for the user's Gmail account.
jwtClient.authorize((err, tokens) => {
	if (err) {
		console.error(err)
	} else {
		const accessToken = tokens.access_token

		// Store the access token in a global variable or a session cookie.
		global.accessToken = accessToken
		// or
		// res.cookie('accessToken', accessToken)
	}
})



    
	// Set up the Gmail API client.
	const gmail = google.gmail({
		version: 'v1',
		auth: 'AIzaSyA_NKFXH7aLknWJWuiB3zrXuM79WrkztKM',
	})

	// Define an API endpoint that retrieves the emails from the user's inbox.
	server.get('/api/emails', (req, res) => {
		gmail.users.messages.list(
			{
                auth: jwtClient,
				userId: privateKey.client_email,
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

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
