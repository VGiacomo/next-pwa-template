import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/components/meta'
import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			// defaultTheme='system' // uncomment to get dark mode
			disableTransitionOnChange
			forcedTheme='white' // comment to get dark mode
		>
			<Meta />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default App
