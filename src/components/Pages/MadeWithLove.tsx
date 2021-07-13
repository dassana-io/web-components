import Coffee from '../assets/images/with_love_coffee.svg'
import { createUseStyles } from 'react-jss'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/pro-regular-svg-icons'
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
import {
	generateThemedMadeWithLoveStyles,
	mediaSelectorsWithBreakpoints
} from './utils'
import React, { FC } from 'react'

const { mobile, tablet } = Breakpoints
const { min } = mediaSelectorsWithBreakpoints

const { dark } = ThemeType

const {
	colors: { reds },
	flexAlignCenter,
	flexCenter,
	flexDown,
	flexSpaceBetween,
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
			height: '100vh'
			// position: 'relative',
			// ...flexSpaceBetween
			// height: '100%',
			// paddingTop: 256
			// backgroundColor: 'blue'
		},
		[min[tablet]]: {
			backgroundColor: 'yellow'
		},
		// ...flexAlignCenter,
		// ...flexCenter,
		// ...flexDown,
		padding: '62px 0',
		textAlign: 'center'
		// padding: '56px 0px'
		// mobile
	},
	content: {
		// paddingBottom: spacing['l+'],
		// textAlign: 'center'
		// ...flexAlignCenter,
		...flexCenter,
		...flexDown,
		// backgroundColor: 'purple',
		flex: 1
	},
	copyright: {
		[min[tablet]]: {
			// paddingBottom: 124
		},
		...font.label,
		paddingTop: spacing.m
	},
	footer: {
		// backgroundColor: 'red',
		[min[mobile]]: {
			// bottom: 60,
			// position: 'absolute',
			paddingTop: 0
		},
		paddingTop: 62
	},
	footerIcon: {
		fontSize: 24,
		width: 40
	},
	footerIcons: {
		// ...flexCenter,
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
		// paddingBottom: 8
	},
	hiringLink: {
		...font.label
	},
	hiringTag: {
		// paddingBottom: 8
	},
	loveIcon: {
		width: 80
	},
	loveIconTag: {
		...font.label,
		paddingTop: spacing.s
	},
	loveIconWrap: {
		// ...flexCenter,
		// ...flexDown,
		[min[tablet]]: {
			// flexDirection: 'row'
		}
		// textAlign: 'center'
	},
	loveIcons: {
		[min[tablet]]: {
			// flexDirection: 'row'
			// paddingTop: 52
		},
		paddingTop: spacing['l+']
		// ...flexCenter,
		// ...flexDown,
		// paddingBottom: 92
	},
	plus: {
		[min[tablet]]: {
			// margin: `0px ${spacing['l+']}px`
		},
		margin: `${spacing.m}px 0px`
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

// TODO: update placeholder hrefs later
const footerLinksConfig = [
	{
		href: 'google.com',
		icon: faTwitterSquare
	},
	{
		href: 'google.com',
		icon: faLinkedin
	},
	{
		href: 'google.com',
		icon: faGithub
	},
	{
		href: 'google.com',
		icon: faSlack
	},
	{
		href: 'google.com',
		icon: faAws
	}
]

export const MadeWithLove: FC = () => {
	const classes = useStyles()

	const renderLoveIcons = () =>
		loveIconsConfig.map(({ icon, tag }, i) => (
			<div className={classes.loveIconWrap} key={i}>
				<div>
					<img alt={tag} className={classes.loveIcon} src={icon} />
					<div className={classes.loveIconTag}>{tag}</div>
				</div>
				{i < loveIconsConfig.length - 1 && (
					<FontAwesomeIcon className={classes.plus} icon={faPlus} />
				)}
			</div>
		))

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div>
					Made with
					<FontAwesomeIcon className={classes.heart} icon={faHeart} />
					in San Jose...in addition to lots of
				</div>
				<div className={classes.loveIcons}>{renderLoveIcons()}</div>
				<div className={classes.hiring}>
					<div className={classes.hiringTag}>
						Are you into momos, gourment coffees and high chews?
					</div>
					{/* TODO: update placeholder */}
					<Link
						classes={[classes.hiringLink]}
						href='www.linkedin.com'
					>
						We’re hiring!
					</Link>
				</div>
			</div>
			<div className={classes.footer}>
				<div className={classes.footerIcons}>
					{footerLinksConfig.map(({ icon, href }, i) => (
						<Link
							classes={[classes.footerIcon]}
							href={href}
							key={i}
						>
							<FontAwesomeIcon icon={icon} />
						</Link>
					))}
				</div>
				<div className={classes.copyright}>
					© {new Date().getFullYear()} Dassana.io, All Rights Reserved
				</div>
			</div>
		</div>
	)
}
