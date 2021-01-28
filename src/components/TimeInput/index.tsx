import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import { TimePicker as AntDTimeInput } from 'antd'
import { BaseFormElementProps } from 'components/types'
import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import InputSkeleton from 'components/Input/InputSkeleton'
import { MomentInputObject } from 'moment'
import noop from 'lodash/noop'
import range from 'lodash/range'
import { formatTime, parseTime, useStyles } from './utils'
import React, { FC } from 'react'

export type TimeFormat = 'unix' | 'hours'

export interface TimeInputProps
	extends Omit<BaseFormElementProps, 'fullWidth' | 'onChange' | 'value'> {
	/** moment display format to format date. Defaults to 'hh:mm A' which will display 08:54 PM
	 * @default 'hh:mm A'
	 * */
	displayFormat?: string
	onChange?: (value: number) => void
	onFocus?: () => void
	/**
	 * format of time input value. Either a unix timestamp in seconds or hour integer (0 - 24)
	 * @default 'unix'
	 */
	format?: TimeFormat
	value?: number
}

export const TimeInput: FC<TimeInputProps> = (props: TimeInputProps) => {
	const {
		classes = [],
		dataTag,
		disabled = false,
		displayFormat = 'hh:mm A',
		onBlur = noop,
		onChange,
		onFocus = noop,
		placeholder = '',
		error = false,
		loading = false,
		format = 'unix',
		value
	} = props

	useStyles()

	const componentClasses = cn(classes)

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange: (momentObj: MomentInputObject) =>
				onChange(parseTime(momentObj, format)),
			value: formatTime(format, value)
		}
	}

	let optionalProps = {}

	if (format === 'hours') {
		optionalProps = {
			disabledMinutes: () => range(60)
		}
	}

	return loading ? (
		<InputSkeleton width={120} />
	) : (
		<AntDTimeInput
			className={cn(componentClasses)}
			disabled={disabled}
			format={displayFormat}
			onBlur={onBlur}
			onFocus={onFocus}
			placeholder={placeholder}
			showNow={false}
			{...controlledCmpProps}
			{...optionalProps}
			{...getDataTestAttributeProp('time-input', dataTag)}
		/>
	)
}
