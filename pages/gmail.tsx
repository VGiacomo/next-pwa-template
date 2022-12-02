import Page from '@/components/page'
import Section from '@/components/section'
import { Button } from '@mui/material'
import { useEffect } from 'react'

// const Inbox = () => (
// 	<Page>
// 		<Section>
//       {useEffect(() => {
//         const gapiLoaded =() =>{

//         }
//         gapiLoaded();
//         gisLoaded();

//       }, [])}

//       </Section>
//       <Section>
// 			<Button id='authorize_button'></Button>
// 			<Button id='signout_button'></Button>
// 		</Section>
// 	</Page>
// )

export default function Gmail() {
	useEffect(() => {
		const p = oauthSignIn()
    console.log({p});
    

		// const emails = getEmails()
		// console.log({ emails })
	}, )

	/*
	 * Create form to request access token from Google's OAuth 2.0 server.
	 */
	function oauthSignIn() {
		// Google's OAuth 2.0 endpoint for requesting an access token
		var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

		// Create <form> element to submit parameters to OAuth 2.0 endpoint.
		var form = document.createElement('form')
		form.setAttribute('method', 'GET') // Send as a GET request.
		form.setAttribute('action', oauth2Endpoint)

		// Parameters to pass to OAuth 2.0 endpoint.
		var params: any = {
			client_id:
				'137757519679-6u6dtvu20at7tciiltpcf6berkopgun0.apps.googleusercontent.com',
			redirect_uri: 'http://localhost:3000',
			response_type: 'token',
			scope: 'https://www.googleapis.com/auth/gmail.readonly',
			include_granted_scopes: 'true',
			state: 'pass-through value',
		}

		// Add form parameters as hidden input values.
		for (var p in params) {
			var input = document.createElement('input')
			input.setAttribute('type', 'hidden')
			input.setAttribute('name', p)
			input.setAttribute('value', params[p])
			form.appendChild(input)
		}

		// Add form to page and submit it to open the OAuth 2.0 endpoint.
		document.body.appendChild(form)
		form.submit()
    return params;
	}

	return (
		<Page>
			<Section>
				{/* <div dangerouslySetInnerHTML={{ __html: myHTML }} /> */}
			</Section>
		</Page>
	)
}
