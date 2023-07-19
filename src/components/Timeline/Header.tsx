import { createUseStyles } from 'react-jss'
import { generateHeaderStyles } from 'components/Accordion/utils'
import { getHeaderBorderRadius } from './utils'
import React, { type FC } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'
import { type TimelineConfig, TimelineState } from './types'

const { alwaysExpanded } = TimelineState

const { dark, light } = ThemeType
const {
	colors: { blacks, grays },
	spacing
} = styleguide

const useStyles = createUseStyles({
	header: {
		...generateHeaderStyles(),
		background: grays['lighten-40'],
		borderRadius: getHeaderBorderRadius,
		cursor: ({ state }) => (state === alwaysExpanded ? 'auto' : 'pointer')
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
