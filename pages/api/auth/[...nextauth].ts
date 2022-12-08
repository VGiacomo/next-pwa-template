import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			//@ts-ignore
			clientId: process.env.GOOGLE_CLIENT_ID,
			//@ts-ignore
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		// ...add more providers here
	],
	secret: process.env.NEXTAUTH_URL,
})
