import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import { TimePicker as AntDTimeInput } from 'antd'
import { BaseFormElementProps } from 'components/types'
import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import InputSkeleton from 'components/Input/InputSkeleton'
import noop from 'lodash/noop'
import moment, { MomentInputObject } from 'moment'
import React, { FC } from 'react'

export interface TimeInputProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	defaultValue?: number
	/** moment display format to format date. Defaults to 'hh:mm A' which will display 08:54 PM
	 * @default 'hh:mm A'
	 * */
	displayFormat?: string
	onChange?: (value: number) => void
	onFocus?: () => void
	onKeyDown?: (e: KeyboardEvent) => void
	/**
	 * format the time will be sent in. Either a unix timestamp in seconds or hour integer (0 - 24)
	 */
	format?: 'unix' | 'hours'
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

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	const inputClasses: string = cn(classes)

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange: (momentObj: MomentInputObject) => {
				onChange(moment(momentObj).unix())
			},
			value: value ? moment.unix(value) : value
		}
	}

	return loading ? (
		<InputSkeleton width={120} />
	) : (
		<AntDTimeInput
			className={cn(inputClasses)}
			disabled={disabled}
			format={displayFormat}
			onBlur={onBlur}
			onFocus={onFocus}
			placeholder={placeholder}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('time-input', dataTag)}
		/>
	)
}
