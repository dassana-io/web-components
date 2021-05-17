import cn from 'classnames'
import { DatePicker } from 'antd'
import { MomentInputObject } from 'moment'
import { formatTime, parseTime } from '../TimeInput/utils'
import React, { FC } from 'react'

const { RangePicker: AntDRangePicker } = DatePicker

export interface DateRangeInputValue {
	end: number
	start: number
}

interface TimeProps {
	displayFormat?: string
}

export interface DateRangeInputProps {
	classes?: string[]
	displayFormat?: string
	onChange?: (value: DateRangeInputValue) => void
	/**
	 * Whether to include time or not. Can either be boolean or an object
	 */
	includeTime?: boolean | TimeProps
	value?: DateRangeInputValue
}

export const DateRangeInput: FC<DateRangeInputProps> = ({
	classes = [],
	displayFormat = 'YYYY-MM-DD hh:mm A',
	onChange,
	includeTime = { displayFormat: 'hh:mm A' },
	value
}: DateRangeInputProps) => {
	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange: (
				momentObjArr: [MomentInputObject, MomentInputObject]
			) => {
				onChange({
					end: parseTime(momentObjArr[1], 'unix'),
					start: parseTime(momentObjArr[0], 'unix')
				})
			}
		}

		if (value) {
			controlledCmpProps = {
				...controlledCmpProps,
				value: [
					formatTime('unix', value.start),
					formatTime('unix', value.end)
				]
			}
		}
	}

	return (
		<AntDRangePicker
			allowClear={false}
			className={cn(classes)}
			format={displayFormat}
			showTime={
				typeof includeTime === 'boolean'
					? includeTime
					: { format: includeTime.displayFormat }
			}
			{...controlledCmpProps}
		/>
	)
}
