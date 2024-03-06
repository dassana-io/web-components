import { Button } from 'components/Button'
import { createUseStyles } from 'react-jss'
import { generateRelativeTimeRange } from './utils'
import { generateThemedBorderStyles } from './styles'
import { Input } from 'components/Input'
import {
	type AdvancedTimeOptionsProps,
	type RelativeTimeRange,
	TimeUnits
} from './types'
import React, { type ChangeEvent, type FC, useMemo, useState } from 'react'
import { Select, type SelectOption } from 'components/Select'
import { styleguide, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const { borderRadius, flexAlignCenter, flexSpaceBetween, spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		...flexSpaceBetween,
		...generateThemedBorderStyles(light),
		borderRadius,
		marginTop: spacing.xl,
		padding: spacing.m
	},
	inputContainer: {
		maxWidth: 100,
		paddingRight: spacing.m
	},
	inputs: {
		...flexAlignCenter
	},
	selectContainer: {
		maxWidth: 124
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateThemedBorderStyles(dark)
		}
	}
})

const selectOptions: SelectOption[] = Object.values(TimeUnits).map(
	timeUnit => ({
		text: `${timeUnit} ago`,
		value: timeUnit
	})
)

interface CustomRelativeTimeProps extends AdvancedTimeOptionsProps {
	value?: RelativeTimeRange
}

const CustomRelativeTime: FC<CustomRelativeTimeProps> = ({
	onTimeRangeChange,
	value
}: CustomRelativeTimeProps) => {
	const { amount, unit } = useMemo(
		() => value ?? generateRelativeTimeRange(1, TimeUnits.day),
		[value]
	)

	const [inputValue, setInputValue] = useState<number>(amount)
	const [timeUnit, setTimeUnit] = useState(unit)

	const classes = useStyles()

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
		setInputValue(Number(e.target.value))

	const onTimeUnitChange = (timeUnit: ChangeEvent<HTMLSelectElement>) =>
		setTimeUnit(timeUnit as unknown as TimeUnits)

	return (
		<div className={classes.container}>
			<div className={classes.inputs}>
				<Input
					containerClasses={[classes.inputContainer]}
					onChange={onInputChange}
					type='number'
					value={String(inputValue)}
				/>
				<Select
					containerClasses={[classes.selectContainer]}
					onChange={onTimeUnitChange}
					options={selectOptions}
					value={timeUnit}
				/>
			</div>
			<Button
				onClick={() =>
					onTimeRangeChange(
						generateRelativeTimeRange(inputValue, timeUnit)
					)
				}
			>
				Ok
			</Button>
		</div>
	)
}

export default CustomRelativeTime
