import { BadgeCard } from '@/components/BadgeCard'
import Page from '@/components/page'
import Section from '@/components/section'
import { connectToDatabase } from '@/lib/mongodb'
import { InferGetServerSidePropsType } from 'next'

export async function getServerSideProps(context) {
	try {
		const { db } = await connectToDatabase()
		const data = await db
			.collection('NewsletterHeaders')
			.find({})
			.limit(20)
			.toArray()
		const result = JSON.parse(JSON.stringify(data))
		// await clientPromise
		// `await clientPromise` will use the default database passed in the MONGODB_URI
		// However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
		//
		// const client = await clientPromise
		// const db = client.db("newsBarnDB")

		// // Then you can execute queries against your database like so:
		// const nl = await db.collection("NewsletterHeaders").find().toArray();
		// console.log("***********************************************************************************************", nl) //or any of the MongoDB Node Driver commands

		return {
			props: { newsletterHeaders: result },
		}
	} catch (e) {
		console.error(e)
		return {
			props: { newsletterHeaders: false },
		}
	}
}

export default function Discover({
	newsletterHeaders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<Page>
			<Section>
				{newsletterHeaders.map((nlHeader: any) => {
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
							listId={nlHeader.listId}
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
