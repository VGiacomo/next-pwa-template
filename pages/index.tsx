import Page from '@/components/page'
import Section from '@/components/section'
import {
	CurrencyEuroIcon,
	GlobeAltIcon,
	LightningBoltIcon,
	MailOpenIcon,
} from '@heroicons/react/outline'

const features = [
	{
		name: 'Find and add any newsletter you like',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: GlobeAltIcon,
	},
	{
		name: 'Complitely free',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: CurrencyEuroIcon,
	},
	{
		name: 'Declutter your personal inbox',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: MailOpenIcon,
	},
	{
		name: 'Ecoconcived',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: LightningBoltIcon,
	},
]

const Index = () => (
	<Page>
		<Section>
			{/* <div className='bg-white py-12 dark:bg-slate-800'> */}
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='lg:text-center'>
						<h2 className='text-base font-semibold uppercase tracking-wide text-indigo-600'>
							News Barn
						</h2>
						<p className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl'>
							A better way to read your NewsLetters
						</p>
						<p className='mt-4 max-w-2xl text-xl text-gray-500 dark:text-zinc-400 lg:mx-auto'>
							Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
							magnam voluptatum cupiditate veritatis in accusamus quisquam.
						</p>
					</div>

					<div className='mt-10'>
						<dl className='space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0'>
							{features.map((feature) => (
								<div key={feature.name} className='relative'>
									<dt>
										<div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white'>
											<feature.icon className='h-6 w-6' aria-hidden='true' />
										</div>
										<p className='ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-gray-200'>
											{feature.name}
										</p>
									</dt>
									<dd className='mt-2 ml-16 text-base text-gray-500 dark:text-gray-400'>
										{feature.description}
									</dd>
								</div>
							))}
						</dl>
					</div>
				{/* </div> */}
			</div>{' '}
		</Section>
	</Page>
)

export default Index
