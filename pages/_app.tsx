import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/components/meta'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

//@ts-ignore
const App = ({ Component, pageProps, session }: AppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Meta />
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</ThemeProvider>
	)
}

export default App
