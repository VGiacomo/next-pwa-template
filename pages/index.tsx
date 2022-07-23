import Page from '@/components/page'
import Section from '@/components/section'

const Index = () => (
	<Page>
		<Section>
			<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				Enjoy your newsletters.
			</h2>

			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut urna
					risus. Phasellus non neque eget lectus facilisis pharetra. Curabitur
					at vestibulum turpis. Phasellus sollicitudin elementum orci, vel
					mollis est cursus ut. Aenean eu placerat nisl. Nullam eget venenatis
					sem. Suspendisse pretium nisl commodo vestibulum posuere. Duis iaculis
					nisi libero. Nullam ultrices porttitor urna, ut euismod tellus
					vestibulum eget. Quisque congue, est id mattis eleifend, massa nibh
					tincidunt urna, ut cursus diam magna sed velit. {' '}
					<span className='font-medium text-zinc-900 dark:text-zinc-50'>
						Aenean sed ipsum
					tellus. Pellentesque hendrerit id nunc et
					</span>{' '}
					scelerisque.
				</p>

				<br />

				<p className='text-sm text-zinc-600 dark:text-zinc-400'>
					{/* <a
						href='https://github.com/mvllow/next-pwa-template'
						className='underline'
					> */}
						Source
					{/* </a> */}
				</p>
			</div>
		</Section>
	</Page>
)

export default Index
