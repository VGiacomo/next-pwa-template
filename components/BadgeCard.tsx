import { IconHeart, IconRss } from '@tabler/icons'
import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	Button,
	ActionIcon,
	createStyles,
} from '@mantine/core'
import { useState, useEffect } from 'react'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId, UUID } from 'bson'
import { Subscription } from '@/pages/types'

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	section: {
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},

	subscribed: {
		color: theme.colors.red[6],
	},
	unSubscribed: {
		color: theme.colors.white,
	},

	label: {
		textTransform: 'uppercase',
		fontSize: theme.fontSizes.xs,
		fontWeight: 700,
	},
}))

interface BadgeCardProps {
	image: string
	title: string
	country: string
	description: string
	onClick: () => {}
  active: boolean
	badges: {
		emoji: string
		label: string
	}[]
}

export function BadgeCard({
	image,
	title,
	description,
  active,
	country,
	badges,
	onClick,
}: BadgeCardProps) {
	const { classes, theme } = useStyles()

	const features = badges.map((badge) => (
		<Badge
			color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
			key={badge.label}
			leftSection={badge.emoji}
		>
			{badge.label}
		</Badge>
	))

	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<Card.Section>
				<Image src={image} alt={title} height={180} />
			</Card.Section>

			<Card.Section className={classes.section} mt='md'>
				<Group position='apart'>
					<Text size='lg' weight={500}>
						{title}
					</Text>
					<Badge size='sm'>{country}</Badge>
				</Group>
				<Text size='sm' mt='xs'>
					{description}
				</Text>
			</Card.Section>

			<Card.Section className={classes.section}>
				<Text mt='md' className={classes.label} color='dimmed'>
					Perfect for you, if you enjoy
				</Text>
				<Group spacing={7} mt={5}>
					{features}
				</Group>
			</Card.Section>

			<Group mt='xs'>
				<Button radius='md' style={{ flex: 1 }}>
					Show details
				</Button>
				<ActionIcon variant='default' radius='md' size={36}>
					<IconRss
						size={18}
						onClick={onClick}
						className={active ? classes.subscribed : classes.unSubscribed}
						stroke={3}
					></IconRss>
				</ActionIcon>
			</Group>
		</Card>
	)
}
