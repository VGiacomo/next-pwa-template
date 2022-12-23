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
	async function updateFavourites(listId: string) {
		//TODO check if already a favourite and remove it from the list
		// let newFavourites: Subscription[] = []
		// let faveSelected: Subscription = {
		// 	_id: ObjectId,
		// 	userId: '',
		// 	newsLetterHeaderId: listId,
		// 	subscriptionDate: Date,
		// }
		console.log('****************', subscriptions, listId)

		const subscriptionFound = subscriptions.find(
			(sub) => sub.newsLetterHeaderId === listId
		)
		if (subscriptionFound) {
			const response = await fetch(
				`/api/subscriptions/${subscriptionFound._id}`,
				{ method: 'delete' }
			)
			router.replace(router.asPath)
		} else {
			console.log('not found!!!')
		}
		
	}

	return (
		<Page>
			<Section>
				{newsletterHeaders.map((nlHeader) => {
					const subscriptionFound = subscriptions.find(
						(sub) =>
							sub.newsLetterHeaderId !== '' &&
							sub.newsLetterHeaderId === nlHeader['list-id']
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
							onClick={() => updateFavourites(nlHeader['list-id'])}
						></BadgeCard>
					)
				})}
				{/* <BadgeCard
					image='https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
					title='Verudela Beach'
					country='Croatia'
					description='A newsletter for the globetrotters out there '
					badges={[
						{
							emoji: '☀️',
							label: 'Sunny weather',
						},
						{
							emoji: '🦓',
							label: 'Onsite zoo',
						},
						{
							emoji: '🌊',
							label: 'Sea',
						},
						{
							emoji: '🌲',
							label: 'Nature',
						},
						{
							emoji: '🤽',
							label: 'Water sports',
						},
					]}
				></BadgeCard>
				<BadgeCard
					image='/images/Screenshot-photography.png'
					title='Photography news'
					country='Belgium'
					description='A newsletter for the photography lovers '
					badges={[
						{
							emoji: '🌆',
							label: 'Street',
						},
						{
							emoji: '🏞️',
							label: 'Landscape',
						},
					]}
				></BadgeCard>
				<BadgeCard
					image='/images/Screenshot-Cuisine.jpg'
					title='The cook book'
					country='Italy'
					description='A new recepe once a week '
					badges={[
						{
							emoji: '🍅🥕🫑',
							label: 'Veggies',
						},
						{
							emoji: '🎉🎊',
							label: 'Special occasion',
						},
					]}
				></BadgeCard> */}
			</Section>
		</Page>
	)
}
