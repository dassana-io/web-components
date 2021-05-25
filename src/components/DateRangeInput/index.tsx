import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { DatePicker } from 'antd'
import { getPopupContainerProps } from '../utils'
import { SelectSkeleton } from 'components/Select/SingleSelect/SelectSkeleton'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { ThemeType } from 'components/assets/styles'
import { formatTime, parseTime } from '../TimeInput/utils'
import { generateDateRangeInputStyles, generateDropdownStyles } from './styles'
import { Moment, MomentInputObject } from 'moment'
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
	disabledDate?: (date: Moment) => boolean
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
	classes = [],
	displayFormat = 'YYYY-MM-DD hh:mm A',
	disabledDate,
	onChange,
	includeTime = { displayFormat: 'hh:mm A' },
	loading = false,
	popupContainerSelector,
	size = 'middle',
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

	return loading ? (
		<SelectSkeleton />
	) : (
		<AntDRangePicker
			allowClear={false}
			className={cn(classes)}
			disabledDate={disabledDate}
			dropdownClassName={compClasses.dropdown}
			format={displayFormat}
			mode={['date', 'date']}
			open // TODO: Delete
			showTime={
				typeof includeTime === 'boolean'
					? includeTime
					: { format: includeTime.displayFormat }
			}
			size={size}
			{...controlledCmpProps}
			{...getPopupContainerProps(popupContainerSelector)}
		/>
	)
}
