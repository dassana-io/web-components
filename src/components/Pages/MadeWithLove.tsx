import cn from 'classnames'
import Coffee from '../assets/images/with_love_coffee.svg'
import { createUseStyles } from 'react-jss'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HighChews from '../assets/images/with_love_high_chews.svg'
import { Link } from 'components/Link'
import Momos from '../assets/images/with_love_momos.svg'
import { styleguide } from 'components/assets/styles'
import { Breakpoints, ThemeType } from '@dassana-io/web-utils'
import {
	faAws,
	faGithub,
	faLinkedin,
	faSlack,
	faTwitterSquare
} from '@fortawesome/free-brands-svg-icons'
import { faPlus, IconDefinition } from '@fortawesome/pro-regular-svg-icons'
import {
	generateThemedMadeWithLoveStyles,
	mediaSelectorsWithBreakpoints
} from './utils'
import React, { FC } from 'react'

const { mobile, tablet } = Breakpoints
const { min } = mediaSelectorsWithBreakpoints

const { dark, light } = ThemeType

const {
	colors: { reds },
	flexAlignCenter,
	flexCenter,
	flexDown,
	font,
	spacing
} = styleguide

const useStyles = createUseStyles({
	container: {
		...font.body,
		...generateThemedMadeWithLoveStyles(dark),
		[min[mobile]]: {
			...flexCenter,
			...flexDown,
			height: '100%'
		},
		padding: '62px 0',
		textAlign: 'center'
	},
	content: {
		...flexCenter,
		...flexDown,
		flex: 1
	},
	copyright: {
		[min[tablet]]: {
			paddingTop: 60
		},
		...font.label,
		paddingTop: spacing.m
	},
	footer: {
		[min[mobile]]: {
			paddingTop: 0
		},
		paddingTop: 62
	},
	footerIcon: {
		fontSize: 24,
		width: 40
	},
	footerIcons: {
		'& > :not(:last-child)': {
			marginRight: 20
		}
	},
	heart: {
		color: reds.base,
		marginLeft: spacing.s,
		marginRight: spacing.s
	},
	hiring: {
		paddingTop: spacing.xl
	},
	hiringLink: {
		...font.label
	},
	hiringTag: {},
	loveIcon: {
		width: 80
	},
	loveIconTag: {
		...font.label,
		paddingTop: spacing.s
	},
	loveIconWrap: {
		[min[tablet]]: {
			...flexAlignCenter
		}
	},
	loveIcons: {
		[min[tablet]]: {
			display: 'flex',
			paddingBottom: 92,
			paddingTop: spacing.xl
		},
		paddingTop: spacing['l+']
	},
	plus: {
		[min[tablet]]: {
			margin: `0px ${spacing.l}px`
		},
		margin: `${spacing.m}px 0px`
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${light}`]: {
			'& $container': generateThemedMadeWithLoveStyles(light)
		}
	}
})

const loveIconsConfig = [
	{
		icon: Momos,
		tag: ' momos'
	},
	{
		icon: Coffee,
		tag: 'gourmet coffees'
	},
	{
		icon: HighChews,
		tag: 'high chews'
	}
]

export interface MadeWithLoveProps {
	classes?: string[]
	footerLinksConfig?: {
		href: string
		icon: IconDefinition
	}[]
}

const defaultFooterLinksConfig = [
	{
		href: 'http://www.twitter.com',
		icon: faTwitterSquare
	},
	{
		href: 'http://www.linkedin.com',
		icon: faLinkedin
	},
	{
		href: 'https://github.com/dassana-io/dassana',
		icon: faGithub
	},
	{
		href: 'https://www.slack.com',
		icon: faSlack
	},
	{
		href: 'https://github.com/dassana-io/dassana',
		icon: faAws
	}
]

export const MadeWithLove: FC<MadeWithLoveProps> = ({
	classes = [],
	footerLinksConfig = defaultFooterLinksConfig
}: MadeWithLoveProps) => {
	const compClasses = useStyles()

	const renderLoveIcons = () =>
		loveIconsConfig.map(({ icon, tag }, i) => (
			<div className={compClasses.loveIconWrap} key={i}>
				<div>
					<img
						alt={tag}
						className={compClasses.loveIcon}
						src={icon}
					/>
					<div className={compClasses.loveIconTag}>{tag}</div>
				</div>
				{i < loveIconsConfig.length - 1 && (
					<FontAwesomeIcon
						className={compClasses.plus}
						icon={faPlus}
					/>
				)}
			</div>
		))

	return (
		<div className={cn(compClasses.container, classes)}>
			<div className={compClasses.content}>
				<div>
					Made with
					<FontAwesomeIcon
						className={compClasses.heart}
						icon={faHeart}
					/>
					in San Jose...in addition to lots of
				</div>
				<div className={compClasses.loveIcons}>{renderLoveIcons()}</div>
				<div className={compClasses.hiring}>
					<div className={compClasses.hiringTag}>
						Are you into momos, gourment coffees and high chews?
					</div>
					{/* TODO: update placeholder */}
					<Link
						classes={[compClasses.hiringLink]}
						href='http://www.linkedin.com'
					>
						We’re hiring!
					</Link>
				</div>
			</div>
			<div className={compClasses.footer}>
				<div className={compClasses.footerIcons}>
					{footerLinksConfig.map(({ icon, href }, i) => (
						<Link
							classes={[compClasses.footerIcon]}
							href={href}
							key={i}
						>
							<FontAwesomeIcon icon={icon} />
						</Link>
					))}
				</div>
				<div className={compClasses.copyright}>
					© {new Date().getFullYear()} Dassana.io, All Rights Reserved
				</div>
			</div>
		</div>
	)
}
