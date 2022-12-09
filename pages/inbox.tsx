import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
	const [emails, setEmails] = useState([])

	// Get the access token from the global variable or the session cookie.
	const accessToken = global.accessToken
	// or
	// const accessToken = req.cookies.accessToken

	useEffect(() => {
		console.log({ accessToken })

		axios
			.get('/api/emails'
			// , {
			// 	headers: {
			// 		Authorization: `Bearer ${accessToken}`,
			// 	},
			// }
			)
			.then((response: any) => setEmails(response.data))
			.catch((error: any) => console.error(error))
	}, [])

	return (
		<ul>
			{emails.map((email) => (
				<li key={email}>{email}</li>
			))}
		</ul>
	)
}

export default Home
