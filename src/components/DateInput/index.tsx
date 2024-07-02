import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import { type BaseFormElementProps } from 'components/types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateButtonStyles } from '../Button/utils'
import { SelectSkeleton } from 'components/Select/SingleSelect/SelectSkeleton'
import { ThemeType } from 'components/assets/styles'
import { DatePicker as AntDDatePicker, type DatePickerProps } from 'antd'
import { generateDateInputStyles, generateDropdownStyles } from './styles'
import { getDataTestAttributeProp, getPopupContainerProps } from '../utils'
import React, { type FC, type FocusEvent } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	dropdown: generateDropdownStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		button: generateButtonStyles(light),
		div: generateDateInputStyles(light),
		[`.${dark}`]: {
			'& $button': generateButtonStyles(dark),
			'& $div': generateDateInputStyles(dark),
			'& $dropdown': generateDropdownStyles(dark)
		}
	}
})

export interface DateInputProps
	extends Omit<
		BaseFormElementProps<HTMLElement>,
		'fullWidth' | 'onChange' | 'value'
	> {
	classes?: string[]
	dataTag?: string
	disabled?: boolean
	format?: DatePickerProps['format']
	onChange?: DatePickerProps['onChange']
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void
	loading?: boolean
	/**
	 * Selector of HTML element inside which to render the dropdown
	 */
	popupContainerSelector?: string
	value?: DatePickerProps['value']
}

export const DateInput: FC<DateInputProps> = ({
	classes = [],
	dataTag,
	disabled = false,
	format = 'MMMM D, YYYY',
	onChange,
	loading = false,
	popupContainerSelector,
	value
}: DateInputProps) => {
	const compClasses = useStyles()

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	let controlledCmpProps = {}
	if (onChange) {
		controlledCmpProps = {
			onChange: (date: moment.Moment, dateString: string) => {
				onChange(date, dateString)
			}
		}

		if (value) {
			controlledCmpProps = {
				...controlledCmpProps,
				value
			}
		}
	}

	return (
		<div {...getDataTestAttributeProp('date-input', dataTag)}>
			{loading ? (
				<SelectSkeleton />
			) : (
				<AntDDatePicker
					allowClear={false}
					className={cn(classes)}
					disabled={disabled}
					dropdownClassName={compClasses.dropdown}
					format={format}
					{...getPopupContainerProps(popupContainerSelector)}
					{...controlledCmpProps}
				/>
			)}
		</div>
	)
}
