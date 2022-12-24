import { BadgeCard } from '@/components/BadgeCard'
import Page from '@/components/page'
import Section from '@/components/section'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { NewsletterHeader, Subscription } from './types'

export const getServerSideProps: GetServerSideProps<{
	newsletterHeaders: NewsletterHeader[]
	subscriptions: Subscription[]
}> = async () => {
	try {
		const { db } = await connectToDatabase()
		const data = await db
			.collection('NewsletterHeaders')
			.find({})
			.limit(20)
			.toArray()
		const result = JSON.parse(JSON.stringify(data))
		const subsData = await db
			.collection('subscriptions')
			.find({})
			.limit(20)
			.toArray()
		const subsResult = JSON.parse(JSON.stringify(subsData))
		return {
			props: { newsletterHeaders: result, subscriptions: subsResult },
		}
	} catch (e) {
		console.error(e)
		return {
			props: { newsletterHeaders: [], subscriptions: [] },
		}
	}
}

export default function Discover({
	newsletterHeaders,
	subscriptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter()

	async function updateFavourites(nlHeaderFrom: string) {
		//TODO check if already a favourite and remove it from the list

		console.log('****************', subscriptions, nlHeaderFrom)

		const subscriptionFound = subscriptions.find(
			(sub) => sub.newsLetterHeaderId === nlHeaderFrom
		)
		
		if (subscriptionFound) {
			console.log({subscriptionFound});
			const response = await fetch(
				`/api/subscriptions/${subscriptionFound._id}`,
				{ method: 'DELETE' }
			)
		} else {
			let nlHeaderToAdd = newsletterHeaders.find(
				(nlH) => nlH.from === nlHeaderFrom
			)
			let faveSelected: Subscription = {
				_id: nlHeaderToAdd!._id,
				userId: '',
				newsLetterHeaderId: nlHeaderFrom,
				subscriptionDate: new Date((new Date()).getTime() + 24*60*60*1000),
			}

			const response = await fetch(`/api/subscriptions/${faveSelected._id}`, {
				method: 'POST',
				body: JSON.stringify(faveSelected),
				headers: {'Content-Type': 'application/json'}
			})
		}
		router.replace(router.asPath)
	}

	return (
		<Page>
			<Section>
				{newsletterHeaders.map((nlHeader) => {
					const subscriptionFound = subscriptions.find(
						(sub) =>
							sub.newsLetterHeaderId !== '' &&
							sub.newsLetterHeaderId === nlHeader.from
					)

					return (
						<BadgeCard
							image={nlHeader.cover}
							title={nlHeader.title}
							country='Belgium'
							description={nlHeader.description}
							badges={[
								{
									emoji: '🤐',
									label: 'zap',
								},
								{
									emoji: '🔧',
									label: 'IT tools',
								},
							]}
							active={!!subscriptionFound}
							onClick={() => updateFavourites(nlHeader.from)}
						></BadgeCard>
					)
				})}
			</Section>
		</Page>
	)
}
