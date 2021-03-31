import { createUseStyles } from 'react-jss'
import moment from 'moment'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'
import { TimelineConfig, TimelineState } from './types'

const { dark, light } = ThemeType
const { flexSpaceBetween, font, spacing } = styleguide

const useStyles = createUseStyles({
	header: {
		...font.bodyLarge,
		...flexSpaceBetween,
		cursor: ({ state }) =>
			state === TimelineState.uncollapsible ? 'auto' : 'pointer',
		padding: spacing.m
	},
	title: {
		color: themes[light].primary
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $title': { color: themes[dark].state.hover }
		}
	}
})

interface Props extends Pick<TimelineConfig, 'title' | 'timestamp'> {
	onClick?: () => void
	state?: TimelineState
}

export const TimelineHeader: FC<Props> = ({
	onClick,
	state,
	timestamp,
	title
}: Props) => {
	const classes = useStyles({ state })

	return (
		<div className={classes.header} onClick={onClick}>
			<div className={classes.title}>{title}</div>
			{timestamp && <div>{moment(timestamp).fromNow()}</div>}
		</div>
	)
}
