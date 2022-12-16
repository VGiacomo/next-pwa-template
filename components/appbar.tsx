import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
	{ label: 'Discover', href: '/discover' },
	// { label: 'Login', href: '/login' },
	{ label: 'Inbox', href: '/inbox' },
	{ label: 'Settings', href: '/settings' },
]

const Appbar = () => {
	const router = useRouter()

	return (
		<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
			<header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
					<Link href='/'>
						<a>
							<h1 className='font-medium'>News Barn</h1>
						</a>
					</Link>

					<nav className='flex items-center space-x-6'>
						<div className='hidden sm:block'>
							<div className='flex items-center space-x-6'>
								{links.map(({ label, href }) => (
									<Link key={label} href={href}>
										<a
											className={`text-sm ${
												router.pathname === href
													? 'text-indigo-500 dark:text-indigo-400'
													: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
											}`}
										>
											{label}
										</a>
									</Link>
								))}
							</div>
						</div>
						<div>
							<Link href='/account'>
								<div
									title='Account'
									className={`h-10 w-10 rounded-full bg-zinc-200 bg-cover bg-center shadow-inner dark:bg-zinc-800 ${
										router.pathname === '/account'
											? 'hover:border-solid hover:border-blue-900 '
											: 'hover:border-black-900 hover:border-solid '
									}`}
									style={{
										backgroundImage:
											'url(https://images.unsplash.com/photo-1612480797665-c96d261eae09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80)',
									}}
								></div>
							</Link>
						</div>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
