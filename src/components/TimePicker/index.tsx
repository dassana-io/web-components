import AdvancedTimeOptions from './AdvancedTimeOptions'
import { Animate } from 'components/Accordion/Animate'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from 'components/utils'
import TimeLabel from './TimeLabel'
import {
	type AbsoluteTimeRange,
	type RelativeTimeRange,
	TimePrependLabels,
	type TimeRange,
	TimeTypes,
	TimeUnits
} from './types'
import {
	extractTimeRangeFromParams,
	generateRelativeTimeLabel,
	generateRelativeTimeMap,
	generateRelativeTimeRange
} from './utils'
import {
	generateThemedContainerStyles,
	generateThemedMenuStyles,
	generateThemedStyles
} from './styles'
import React, { type FC, useState } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType
const { flexDown, spacing } = styleguide

const relativeTimeMap = generateRelativeTimeMap()

const useStyles = createUseStyles({
	container: {
		...generateThemedContainerStyles(light),
		display: 'flex'
	},
	customContainer: {
		...generateThemedStyles(light),
		height: '100%',
		minHeight: 475,
		width: 525
	},
	menu: {
		...flexDown,
		width: 200
	},
	menuInput: {
		...generateThemedMenuStyles(light),
		cursor: 'pointer',
		padding: spacing.m
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateThemedContainerStyles(dark),
			'& $customContainer': generateThemedStyles(dark),
			'& $menuInput': generateThemedMenuStyles(dark)
		}
	}
})

interface TimePickerProps {
	onChange: (timeRange: TimeRange) => void
	value?: TimeRange
}

export const TimePicker: FC<TimePickerProps> = ({
	onChange,
	value
}: TimePickerProps) => {
	const [showCustom, setShowCustom] = useState(false)
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Animate duration={0.2} isExpanded={showCustom}>
				<div className={classes.customContainer}>
					<AdvancedTimeOptions
						onTimeRangeChange={onChange}
						value={value}
					/>
				</div>
			</Animate>
			<div className={classes.menu}>
				{relativeTimeMap.map((timeRange, i) => {
					const timeLabel = generateRelativeTimeLabel(
						timeRange,
						TimePrependLabels.past
					)

					return (
						<div
							className={classes.menuInput}
							key={i}
							onClick={() => onChange(timeRange)}
							{...getDataTestAttributeProp(
								'time-label-relative',
								timeLabel
							)}
						>
							{timeLabel}
						</div>
					)
				})}
				<div
					className={classes.menuInput}
					onClick={() => onChange({ type: TimeTypes.all })}
					{...getDataTestAttributeProp('time-label-all')}
				>
					All Time
				</div>
				<div
					className={classes.menuInput}
					onClick={() => setShowCustom(!showCustom)}
					{...getDataTestAttributeProp('time-label-advanced')}
				>
					Advanced
				</div>
			</div>
		</div>
	)
}

export {
	extractTimeRangeFromParams,
	generateRelativeTimeRange,
	TimeLabel,
	TimePrependLabels,
	TimeTypes,
	TimeUnits
}

export type { AbsoluteTimeRange, RelativeTimeRange, TimeRange }
