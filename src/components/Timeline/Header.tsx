import { createUseStyles } from 'react-jss'
import { getHeaderBorderRadius } from './utils'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'
import { TimelineConfig, TimelineState } from './types'

const { dark, light } = ThemeType
const {
	colors: { blacks, grays },
	flexSpaceBetween,
	font,
	fontWeight,
	spacing
} = styleguide

const useStyles = createUseStyles({
	header: {
		...font.body,
		...flexSpaceBetween,
		alignItems: 'center',
		background: grays['lighten-40'],
		borderRadius: getHeaderBorderRadius,
		cursor: ({ state }) =>
			state === TimelineState.alwaysExpanded ? 'auto' : 'pointer',
		fontWeight: fontWeight.light,
		padding: {
			left: spacing['s+'],
			right: spacing['s+']
		}
	},
	title: {
		color: themes[light].primary,
		padding: spacing.s,
		paddingLeft: 0
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $header': {
				background: blacks['darken-10']
			},
			'& $title': { color: themes[dark].state.hover }
		}
	}
})

interface HeaderProps
	extends Pick<TimelineConfig, 'title' | 'headerRightContent'> {
	onClick?: () => void
	state?: TimelineState
}

export const Header: FC<HeaderProps> = ({
	onClick,
	state,
	headerRightContent,
	title
}: HeaderProps) => {
	const classes = useStyles({ state })

	return (
		<div className={classes.header} onClick={onClick}>
			<div className={classes.title}>{title}</div>
			{headerRightContent && headerRightContent}
		</div>
	)
}
