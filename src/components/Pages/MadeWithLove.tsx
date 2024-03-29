import Candy from '../assets/images/candy.svg'
import cn from 'classnames'
import Coffee from '../assets/images/coffee.svg'
import { createUseStyles } from 'react-jss'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'components/Link'
import Momos from '../assets/images/momo.svg'
import { styleguide } from 'components/assets/styles'
import { Breakpoints, ThemeType } from '@dassana-io/web-utils'
import {
	faGithub,
	faLinkedin,
	faSlack,
	faTwitterSquare
} from '@fortawesome/free-brands-svg-icons'
import { faPlus, type IconDefinition } from '@fortawesome/pro-regular-svg-icons'
import {
	generateThemedMadeWithLoveStyles,
	mediaSelectorsWithBreakpoints
} from './utils'
import React, { type FC } from 'react'

const { mobile, tablet } = Breakpoints
const { max, min } = mediaSelectorsWithBreakpoints

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
			paddingTop: 50
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
		[max[mobile]]: {
			width: '60%'
		},
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
		[min[mobile]]: {
			...flexAlignCenter
		}
	},
	loveIcons: {
		[min[mobile]]: {
			display: 'flex',
			paddingBottom: spacing.xl,
			paddingTop: spacing.xl
		},
		paddingTop: spacing['l+']
	},
	madeWith: {
		[max[mobile]]: {
			width: '60%'
		},
		...flexCenter,
		flexWrap: 'wrap'
	},
	plus: {
		margin: spacing.l
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
		icon: Candy,
		tag: 'high chews'
	}
]

export interface FooterLinksConfig {
	href: string
	icon: IconDefinition
}
export interface MadeWithLoveProps {
	classes?: string[]
	footerLinksConfig?: FooterLinksConfig[]
}

const defaultFooterLinksConfig: FooterLinksConfig[] = [
	{
		href: 'https://twitter.com/DassanaSecurity',
		icon: faTwitterSquare
	},
	{
		href: 'https://www.linkedin.com/company/dassana-inc/',
		icon: faLinkedin
	},
	{
		href: 'https://github.com/dassana-io/dassana',
		icon: faGithub
	},
	{
		href: 'https://dassanacommunity.slack.com/join/shared_invite/zt-teo6d5ed-xkWDNSaH4m6pC8PAJnrD8g#/shared-invite/email',
		icon: faSlack
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
				<div className={compClasses.madeWith}>
					<div>
						Made with
						<FontAwesomeIcon
							className={compClasses.heart}
							icon={faHeart}
						/>
						in San Jose...
					</div>
					<div>in addition to lots of</div>
				</div>
				<div className={compClasses.loveIcons}>{renderLoveIcons()}</div>
				<div className={compClasses.hiring}>
					<div className={compClasses.hiringTag}>
						Are you into momos, gourmet coffees, and high chews?
					</div>
					{/* TODO: update placeholder */}
					<Link
						classes={[compClasses.hiringLink]}
						href='https://dassanaio.notion.site/Job-Board-0a01b48e2ef8462bb3d12e50b8b21c9b'
						target='_blank'
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
							target='_blank'
						>
							<FontAwesomeIcon icon={icon} />
						</Link>
					))}
				</div>
				<div className={compClasses.copyright}>
					© {new Date().getFullYear()} Dassana Inc /{' '}
					<Link
						href='https://dassanaio.notion.site/Privacy-Policy-ed4f1a5d498846c0b7a3edb02119a384'
						target='_blank'
					>
						Privacy
					</Link>
				</div>
			</div>
		</div>
	)
}
