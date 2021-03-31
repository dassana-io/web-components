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
		background: grays['lighten-40'],
		borderRadius: getHeaderBorderRadius,
		cursor: ({ state }) =>
			state === TimelineState.uncollapsible ? 'auto' : 'pointer',
		fontWeight: fontWeight.light,
		padding: `${spacing.s}px ${spacing['s+']}px`
	},
	title: {
		color: themes[light].primary
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

interface Props extends Pick<TimelineConfig, 'title' | 'headerExtra'> {
	onClick?: () => void
	state?: TimelineState
}

export const TimelineHeader: FC<Props> = ({
	onClick,
	state,
	headerExtra,
	title
}: Props) => {
	const classes = useStyles({ state })

	return (
		<div className={classes.header} onClick={onClick}>
			<div className={classes.title}>{title}</div>
			{headerExtra && <div>{headerExtra}</div>}
		</div>
	)
}
