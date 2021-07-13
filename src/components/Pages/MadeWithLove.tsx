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

const { tablet } = Breakpoints
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
	copyright: {
		[min[tablet]]: {
			// paddingBottom: 124
		},
		...font.label,
		paddingTop: 60
	},
	heart: {
		color: reds.base,
		marginLeft: spacing.s,
		marginRight: spacing.s
	},
	love: {
		height: '100vh',
		...generateThemedMadeWithLoveStyles(dark),
		[min[tablet]]: {
			// ...flexSpaceBetween
			// height: '100%',
			// paddingTop: 256
		},
		// ...flexAlignCenter,
		...flexCenter,
		...flexDown,
		position: 'relative',
		textAlign: 'center'
		// padding: '56px 0px'
	},
	loveContent: {
		// paddingBottom: spacing['l+'],
		textAlign: 'center'
	},
	loveIcon: {
		width: 80
	},
	loveIconContainer: {
		...flexCenter,
		...flexDown,
		[min[tablet]]: {
			flexDirection: 'row'
		},
		textAlign: 'center'
	},
	loveIconTag: {
		...font.label
		// paddingTop: spacing.s
	},
	loveIcons: {
		[min[tablet]]: {
			flexDirection: 'row'
		},
		...flexCenter,
		...flexDown,
		paddingTop: 52,
		paddingBottom: 92
	},
	plus: {
		[min[tablet]]: {
			// margin: `0px ${spacing['l+']}px`
		}
		// margin: `${spacing['l+']}px 0px`
	},
	hiring: {
		...font.label
	},
	hiringTagline: {
		paddingBottom: 8
	},
	footer: {
		position: 'absolute',
		bottom: 60
	},
	footerIcon: {
		// width: 40
		fontSize: 24
	},
	footerIcons: {
		...flexCenter,
		'& > :not(:last-child)': {
			marginRight: 20
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
			<div className={classes.loveIconContainer} key={i}>
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
		<div className={classes.love}>
			<div className={classes.loveContent}>
				<div>
					Made with
					<FontAwesomeIcon className={classes.heart} icon={faHeart} />
					in San Jose...in addition to lots of
				</div>
				<div className={classes.loveIcons}>{renderLoveIcons()}</div>
				<div>
					<div className={classes.hiringTagline}>
						Are you into momos, gourment coffees and high chews?
					</div>
					{/* TODO: update placeholder */}
					<Link classes={[classes.hiring]} href='www.linkedin.com'>
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
