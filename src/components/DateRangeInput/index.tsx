import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { DatePicker } from 'antd'
import { getPopupContainerProps } from '../utils'
import { MomentInputObject } from 'moment'
import { ThemeType } from 'components/assets/styles'
import { formatTime, parseTime } from '../TimeInput/utils'
import { generateDateRangeInputStyles, generateDropdownStyles } from './styles'
import React, { FC } from 'react'

const { dark, light } = ThemeType
const { RangePicker: AntDRangePicker } = DatePicker

const useStyles = createUseStyles({
	dropdown: generateDropdownStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		div: generateDateRangeInputStyles(light),
		[`.${dark}`]: {
			'& $div': generateDateRangeInputStyles(dark),
			'& $dropdown': generateDropdownStyles(dark)
		}
	}
})

export interface DateRangeInputValue {
	endTime: number
	startTime: number
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
	/**
	 * Selector of HTML element inside which to render the dropdown
	 */
	popupContainerSelector?: string
	value?: DateRangeInputValue
}

export const DateRangeInput: FC<DateRangeInputProps> = ({
	classes = [],
	displayFormat = 'YYYY-MM-DD hh:mm A',
	onChange,
	includeTime = { displayFormat: 'hh:mm A' },
	popupContainerSelector,
	value
}: DateRangeInputProps) => {
	const compClasses = useStyles()

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
					endTime: parseTime(momentObjArr[1], 'unix'),
					startTime: parseTime(momentObjArr[0], 'unix')
				})
			}
		}

		if (value) {
			controlledCmpProps = {
				...controlledCmpProps,
				value: [
					formatTime('unix', value.startTime),
					formatTime('unix', value.endTime)
				]
			}
		}
	}

	return (
		<AntDRangePicker
			allowClear={false}
			className={cn(classes)}
			dropdownClassName={compClasses.dropdown}
			format={displayFormat}
			open // TODO: DELETE prop before commiting
			showTime={
				typeof includeTime === 'boolean'
					? includeTime
					: { format: includeTime.displayFormat }
			}
			{...controlledCmpProps}
			{...getPopupContainerProps(popupContainerSelector)}
		/>
	)
}
