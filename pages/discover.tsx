import { BadgeCard } from '@/components/BadgeCard'
import Page from '@/components/page'
import Section from '@/components/section'

export default function Discover() {
	return (
		<Page>
			<Section>
				<BadgeCard
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
				></BadgeCard>
			</Section>
		</Page>
	)
}
