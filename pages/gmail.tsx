import Page from '@/components/page'
import Section from '@/components/section'
import { Button } from '@mui/material'
import { useEffect } from 'react'

export default function Gmail() {
	
	// This is a simple Node.js mail server that receives email coming from a Gmail inbox.

const nodemailer = require('nodemailer'); // Import the nodemailer module

// Create a transport object for sending email
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail SMTP server
  port: 465, // Gmail SMTP port
  secure: true, // use SSL
  auth: {
    user: '<your-gmail-username>@gmail.com', // Your Gmail username
    pass: '<your-gmail-password>' // Your Gmail password
  }
});

// Create a server that listens for incoming email
const server = nodemailer.createServer({
  debug: true // Enable debug logging
});

// Start the server
server.listen(2525, 'localhost', function() {
  console.log('Mail server listening on localhost:2525');
});

// Handle incoming email
server.on('message', function(msg) {
  console.log('New email received:');
  console.log(msg); // Log the received email to the console
});

	return (
		<Page>
			<Section>
				{/* {render()} */}
				{/* <iframe src={htmlFile}></iframe>{' '} */}
			</Section>
		</Page>
	)
}
