import capitalize from 'lodash/capitalize'
import { createUseStyles } from 'react-jss'
import CustomRelativeTime from './CustomRelativeTime'
import { generateRelativeTimeRange } from './utils'
import { getDataTestAttributeProp } from 'components/utils'
import omit from 'lodash/omit'
import { styleguide } from '../assets/styles'
import {
	type AbsoluteTimeRange,
	type RelativeTimeRange,
	type TimeRange,
	TimeTypes,
	TimeUnits
} from './types'
import {
	DateRangeInput,
	type DateRangeInputValue
} from 'components/DateRangeInput'
import {
	RadioButtonGroup,
	type RadioButtonGroupOptions,
	type RadioChangeEvent
} from 'components/RadioButtonGroup'
import React, { type FC, useMemo, useState } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		padding: spacing.m
	},
	dateRange: {
		margin: `${spacing.xl}px 0`
	}
})

const radioButtonGroupOptions: RadioButtonGroupOptions[] = Object.keys(
	omit(TimeTypes, 'all')
).map(timeType => ({
	label: (
		<span
			{...getDataTestAttributeProp('advanced-time-type-option', timeType)}
		>
			{capitalize(timeType)}
		</span>
	),
	value: timeType
}))

interface AdvancedTimeOptionsProps {
	onTimeRangeChange: (timeRange: TimeRange) => void
	value?: TimeRange
}

const AdvancedTimeOptions: FC<AdvancedTimeOptionsProps> = ({
	onTimeRangeChange,
	value = generateRelativeTimeRange(1, TimeUnits.day)
}: AdvancedTimeOptionsProps) => {
	const assumedTimeType = useMemo(() => value.type, [value.type])

	const [timeType, setTimeType] = useState(assumedTimeType)

	const classes = useStyles()

	const onRadioButtonChange = (e: RadioChangeEvent) =>
		setTimeType(e.target.value)

	const onAbsoluteTimeRangeChange = (dateValues: DateRangeInputValue) =>
		onTimeRangeChange({
			...dateValues,
			type: TimeTypes.absolute
		})

	let absoluteTRProps: Record<'value', DateRangeInputValue> = {} as Record<
		'value',
		DateRangeInputValue
	>

	if (assumedTimeType === TimeTypes.absolute) {
		absoluteTRProps = {
			value: omit(value, 'type') as Omit<AbsoluteTimeRange, 'type'>
		}
	}

	return (
		<div className={classes.container}>
			<RadioButtonGroup
				onChange={onRadioButtonChange}
				options={radioButtonGroupOptions}
				value={timeType}
			/>
			{timeType === TimeTypes.relative ? (
				<CustomRelativeTime
					onTimeRangeChange={onTimeRangeChange}
					value={
						assumedTimeType === TimeTypes.relative
							? (value as RelativeTimeRange)
							: undefined
					}
				/>
			) : (
				<DateRangeInput
					alwaysOpen
					classes={[classes.dateRange]}
					dataTag='custom-absolute-time'
					onChange={onAbsoluteTimeRangeChange}
					popupContainerSelector={`.${classes.container}`}
					{...absoluteTRProps}
				/>
			)}
		</div>
	)
}

export default AdvancedTimeOptions
