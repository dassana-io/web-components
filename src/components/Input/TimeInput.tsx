import 'antd/lib/input/style/index.css'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import noop from 'lodash/noop'
import { Skeleton } from '../Skeleton'
import { ThemeType } from '../assets/styles/themes'
import { Input as AntDInput, Select } from 'antd'
import {
	defaultFieldWidth,
	fieldErrorStyles
} from '../assets/styles/styleguide'
import { generateInputSkeletonStyles, generateInputStyles } from './utils'
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	error: { ...fieldErrorStyles.error },
	inputSkeleton: generateInputSkeletonStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $input': generateInputStyles(dark),
			'& $inputSkeleton': generateInputSkeletonStyles(dark)
		},
		input: generateInputStyles(light)
	}
})

const InputSkeleton: FC<TimeInputProps> = (props: TimeInputProps) => {
	const classes = useStyles(props)

	return (
		<div className={classes.container}>
			<div className={classes.inputSkeleton}>
				<Skeleton height={16} />
			</div>
		</div>
	)
}

const stringTo24HourTimeNum = (timeStr: string, isPM?: boolean) => {
	const [hoursStr] = timeStr.split(':')

	const hoursNum = parseInt(hoursStr)

	if (isPM && hoursNum < 12) return hoursNum + 12
	else if (!isPM && hoursNum === 12) return hoursNum - 12
	else return hoursNum
}

const numberToTimeStr = (time: number) => {
	if (time === 0) return { period: 'am', time: '12:00' }
	else if (time < 12) return { period: 'am', time: `${time.toString()}:00` }
	else if (time > 23)
		return { period: 'am', time: `${(time - 12).toString()}:00` }
	else if (time === 12) return { period: 'pm', time: `${time.toString()}:00` }
	else return { period: 'pm', time: `${(time - 12).toString()}:00` }
}

const getInitialVals = (defaultValue?: number, value?: number) => {
	const localVal = defaultValue || defaultValue === 0 ? defaultValue : value

	return localVal || localVal === 0
		? numberToTimeStr(localVal)
		: numberToTimeStr(0)
}

export interface TimeInputProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	/**
	 * Default value for select component. Without this, the select dropdown will be blank until an option is selected
	 */
	defaultValue?: number
	onChange?: (value: number) => void
	onFocus?: () => void
	onKeyDown?: (e: KeyboardEvent) => void
	value?: number
}

export const TimeInput: FC<TimeInputProps> = (props: TimeInputProps) => {
	const {
		classes = [],
		dataTag,
		defaultValue,
		disabled = false,
		onChange,
		onFocus = noop,
		onKeyDown = noop,
		error = false,
		loading = false,
		placeholder = '',
		value
	} = props

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error
		},
		classes
	)

	const { period, time } = getInitialVals(defaultValue, value)

	const [localValue, setLocalValue] = useState<string>(time)

	/* ----- Time period: AM/PM Relevant ----- */

	const selectOpts = [
		{ text: 'AM', value: 'am' },
		{ text: 'PM', value: 'pm' }
	]

	const [currentTimePeriod, setCurrentTimePeriod] = useState(period)

	const onSelectChange = (value: string) => {
		setCurrentTimePeriod(value)

		if (onChange)
			onChange(stringTo24HourTimeNum(localValue, value === 'pm'))
	}

	const selectAfter = (
		<Select defaultValue={currentTimePeriod} onChange={onSelectChange}>
			{selectOpts.map(({ text, value }) => (
				<Select.Option key={value} value={value}>
					{text}
				</Select.Option>
			))}
		</Select>
	)

	/* ------------------------------------- */

	const onChangeAntD = (e: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			// TODO: regex check value to be in format 0:00 with first num between 0 - 12
			onChange(
				stringTo24HourTimeNum(
					e.target.value,
					currentTimePeriod === 'pm'
				)
			)
			setLocalValue(e.target.value)
		}
	}

	interface OptionalProps {
		defaultValue?: string
		value?: string
	}

	const optionalProps: OptionalProps = {}

	if (value || value === 0) {
		optionalProps.value = numberToTimeStr(value).time
	}

	if (defaultValue || defaultValue === 0)
		optionalProps.defaultValue = numberToTimeStr(defaultValue).time

	if ((value || value === 0) && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	return loading ? (
		<InputSkeleton {...props} />
	) : (
		<AntDInput
			addonAfter={selectAfter}
			className={cn(componentClasses.container, inputClasses)}
			disabled={disabled}
			onChange={onChangeAntD}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
			type={'text'}
			{...optionalProps}
			{...getDataTestAttributeProp('input', dataTag)}
		/>
	)
}
