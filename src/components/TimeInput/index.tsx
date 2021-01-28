import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import { TimePicker as AntDTimeInput } from 'antd'
import { BaseFormElementProps } from 'components/types'
import cn from 'classnames'
import InputSkeleton from 'components/Input/InputSkeleton'
import { MomentInputObject } from 'moment'
import noop from 'lodash/noop'
import range from 'lodash/range'
import { formatTime, parseTime, useStyles } from './utils'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'
import React, { FC } from 'react'

export type TimeFormat = 'unix' | 'hours'

export interface TimeInputProps
	extends Omit<BaseFormElementProps, 'fullWidth' | 'onChange' | 'value'> {
	defaultValue?: number
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
	/**
	 * Selector of HTML element inside which to render the dropdown
	 */
	popupContainerSelector?: string
	value?: number
}

export const TimeInput: FC<TimeInputProps> = (props: TimeInputProps) => {
	const {
		classes = [],
		defaultValue,
		dataTag,
		disabled = false,
		displayFormat = 'hh:mm A',
		onBlur = noop,
		onChange,
		onFocus = noop,
		placeholder = '',
		popupContainerSelector,
		error = false,
		loading = false,
		format = 'unix',
		value
	} = props

	const componentClasses = useStyles()

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

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
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
			className={cn({ [componentClasses.error]: error }, classes)}
			defaultValue={formatTime(format, defaultValue)}
			disabled={disabled}
			format={displayFormat}
			onBlur={onBlur}
			onFocus={onFocus}
			placeholder={placeholder}
			popupClassName={componentClasses.dropdown}
			showNow={false}
			{...controlledCmpProps}
			{...optionalProps}
			{...popupContainerProps}
			{...getDataTestAttributeProp('time-input', dataTag)}
		/>
	)
}
