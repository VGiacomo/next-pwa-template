import Page from '@/components/page'
import Section from '@/components/section'
import { useSession } from 'next-auth/react'
import Gmail from './gmail'

const Inbox = () => {
	const { data: session, status } = useSession({ required: true })
	if (status === 'authenticated') {
		return (
			<Page>
				<Section>
					{
						<div>
							Welcome {session.user.name}
							<Gmail></Gmail>
						</div>
					}
				</Section>
			</Page>
		)
	} else {
		return (
			<div>
				<p>You are not logged in.</p>
			</div>
		)
	}
}

export default Inbox
