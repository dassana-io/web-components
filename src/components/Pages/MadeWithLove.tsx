import Coffee from '../assets/images/with_love_coffee.svg'
import { createUseStyles } from 'react-jss'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HighChews from '../assets/images/with_love_high_chews.svg'
import Momos from '../assets/images/with_love_momos.svg'
import { styleguide } from 'components/assets/styles'
import { Breakpoints, ThemeType } from '@dassana-io/web-utils'
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
			paddingBottom: 124
		},
		...font.label,
		paddingTop: 56
	},
	heart: {
		color: reds.base,
		marginLeft: spacing.s,
		marginRight: spacing.s
	},
	love: {
		...generateThemedMadeWithLoveStyles(dark),
		[min[tablet]]: {
			...flexSpaceBetween,
			height: '100%',
			paddingTop: 256
		},
		...flexAlignCenter,
		...flexDown,
		padding: '56px 0px'
	},
	loveContent: {
		paddingBottom: spacing['l+'],
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
		...font.label,
		paddingTop: spacing.s
	},
	loveIcons: {
		[min[tablet]]: {
			flexDirection: 'row'
		},
		...flexCenter,
		...flexDown,
		paddingTop: 52
	},
	plus: {
		[min[tablet]]: {
			margin: `0px ${spacing['l+']}px`
		},
		margin: `${spacing['l+']}px 0px`
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
			</div>
			<div className={classes.copyright}>
				© {new Date().getFullYear()} Dassana.io, All Rights Reserved
			</div>
		</div>
	)
}
