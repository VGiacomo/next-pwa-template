import { CogIcon, InboxIcon, SearchIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BottomNav = () => {
	const router = useRouter()

	return (
		<div className='sm:hidden'>
			<nav className='fixed bottom-0 w-full border-t bg-zinc-100 pb-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-16 max-w-md items-center justify-around px-6'>
					{links.map(({ href, label, icon }) => (
						<Link key={label} href={href}>
							<a
								className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${
									router.pathname === href
										? 'text-indigo-500 dark:text-indigo-400'
										: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
								}`}
							>
								{icon}
								<span className='text-xs text-zinc-600 dark:text-zinc-400'>
									{label}
								</span>
							</a>
						</Link>
					))}
				</div>
			</nav>
		</div>
	)
}

export default BottomNav

const links = [
	{
		label: 'Discover',
		href: '/discover',
		icon: (
			<SearchIcon width={18} height={18}></SearchIcon>
		),
	},
	{
		label: 'Inbox',
		href: '/inbox',
		icon: (
			<InboxIcon width={18} height={18}></InboxIcon>
		),
	},
	{
		label: 'Settings',
		href: '/settings',
		icon: (
			<CogIcon width={18} height={18}></CogIcon>
		),
	},
]
