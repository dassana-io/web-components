import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faClock } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateTimeLabel } from './utils'
import React, { type FC } from 'react'
import { styleguide, ThemeType } from '../assets/styles'
import { TimePrependLabels, type TimeRange } from './types'

const { dark } = ThemeType

const { colors, font, fontWeight, spacing } = styleguide
const { blacks, grays } = colors

const useStyles = createUseStyles({
	timeIcon: {
		marginRight: spacing['s+']
	},
	timeLabel: {
		...font.body,
		color: blacks['lighten-10'],
		fontWeight: fontWeight.light,
		overflowX: 'auto',
		whiteSpace: 'nowrap'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $timeLabel': {
				color: grays.base
			}
		}
	}
})

interface TimeLabelProps {
	containerClasses?: string[]
	timeRange: TimeRange
}

const TimeLabel: FC<TimeLabelProps> = ({
	containerClasses = [],
	timeRange
}: TimeLabelProps) => {
	const classes = useStyles()

	return (
		<div className={cn({ [classes.timeLabel]: true }, containerClasses)}>
			<FontAwesomeIcon className={classes.timeIcon} icon={faClock} />
			{generateTimeLabel(timeRange, TimePrependLabels.past)}
		</div>
	)
}

export default TimeLabel
