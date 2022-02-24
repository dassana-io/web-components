import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { DatePicker } from 'components/DatePicker'
import { generateButtonStyles } from '../Button/utils'
import { SelectSkeleton } from 'components/Select/SingleSelect/SelectSkeleton'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { ThemeType } from 'components/assets/styles'
import { formatTime, getPopupContainerProps, parseTime } from '../utils'
import { generateDateRangeInputStyles, generateDropdownStyles } from './styles'
import React, { FC } from 'react'

const { dark, light } = ThemeType
const { RangePicker: AntDRangePicker } = DatePicker

const useStyles = createUseStyles({
	dropdown: generateDropdownStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		button: generateButtonStyles(light),
		div: generateDateRangeInputStyles(light),
		[`.${dark}`]: {
			'& $button': generateButtonStyles(dark),
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
	alwaysOpen?: boolean
	classes?: string[]
	disabledDate?: (date: Date) => boolean
	displayFormat?: string
	onChange?: (value: DateRangeInputValue) => void
	/**
	 * Whether to include time or not. Can either be boolean or an object
	 */
	includeTime?: boolean | TimeProps
	loading?: boolean
	/**
	 * Selector of HTML element inside which to render the dropdown
	 */
	popupContainerSelector?: string
	size?: SizeType
	value?: DateRangeInputValue
}

export const DateRangeInput: FC<DateRangeInputProps> = ({
	alwaysOpen = false,
	classes = [],
	displayFormat = 'yyyy-mm-dd hh:mm a',
	disabledDate,
	onChange,
	includeTime = { displayFormat: 'hh:mm a' },
	loading = false,
	popupContainerSelector,
	size = 'middle',
	value
}: DateRangeInputProps) => {
	const compClasses = useStyles()

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	const controlledCmpProps = {}

	// if (onChange) {
	// 	controlledCmpProps = {
	// 		onChange: (dateArr: [Date, Date]) => {
	// 			onChange({
	// 				endTime: parseTime(dateArr[1], 'unix'),
	// 				startTime: parseTime(dateArr[0], 'unix')
	// 			})
	// 		}
	// 	}

	// 	if (value) {
	// 		controlledCmpProps = {
	// 			...controlledCmpProps,
	// 			value: [
	// 				formatTime('unix', value.startTime),
	// 				formatTime('unix', value.endTime)
	// 			]
	// 		}
	// 	}
	// }

	let openProps = {}

	if (alwaysOpen) {
		openProps = { open: true }
	}

	return loading ? (
		<SelectSkeleton />
	) : (
		<AntDRangePicker
			allowClear={false}
			className={cn(classes)}
			// disabledDate={disabledDate}
			dropdownClassName={compClasses.dropdown}
			format={displayFormat}
			mode={['date', 'date']}
			showTime={
				typeof includeTime === 'boolean'
					? includeTime
					: { format: includeTime.displayFormat }
			}
			size={size}
			{...controlledCmpProps}
			{...openProps}
			{...getPopupContainerProps(popupContainerSelector)}
		/>
	)
}
