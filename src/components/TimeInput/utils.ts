import { createUseStyles } from 'react-jss'
import { generateButtonStyles } from 'components/Button/utils'
import isUndefined from 'lodash/isUndefined'
import {
	dropdownStyles,
	inputPalette,
	themedStyles,
	ThemeType
} from 'components/assets/styles/themes'
import {
	fieldErrorStyles,
	styleguide
} from 'components/assets/styles/styleguide'
import moment, { type MomentInputObject } from 'moment'
import { type TimeFormat, type TimeInputProps } from './index'

const { borderRadius } = styleguide
const { dark, light } = ThemeType

const hourIntegerFormat = 'HH'

type FormatTime = (format: TimeFormat, value?: TimeInputProps['value']) =>
		| moment.Moment
		| undefined

export const formatTime: FormatTime = (format, value) => {
	if (isUndefined(value)) return value

	if (format === 'unix') {
		return moment(value)
	}

	return moment(value, hourIntegerFormat)
}

// ----------------------------------------

type ParseTime = (momentObj: MomentInputObject, format: TimeFormat) => number

export const parseTime: ParseTime = (momentObj, format) =>
	format === 'unix'
		? moment(momentObj).valueOf()
		: parseInt(moment(momentObj).format(hourIntegerFormat))

// -x-x-x-x-x-x-x-x- Styles Related -x-x-x-x-x-x-x-x-

export const generateTimePanelColumnStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor, color },
		disabled
	} = themedStyles[themeType]

	const {
		base: { background },
		hover,
		selected
	} = dropdownStyles[themeType]

	return {
		'& .ant-picker-time-panel-column': {
			'& > li.ant-picker-time-panel-cell': {
				'& .ant-picker-time-panel-cell-inner': {
					'&:hover': { background: hover.background },
					background,
					color
				},
				'&.ant-picker-time-panel-cell-disabled': {
					'& .ant-picker-time-panel-cell-inner': {
						color: disabled.color
					},
					'& .ant-picker-time-panel-cell-inner:hover': {
						background
					}
				},
				'&.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner:hover':
					{
						background: selected.background
					}
			},
			'& > li.ant-picker-time-panel-cell-selected div.ant-picker-time-panel-cell-inner':
				{
					background: selected.background,
					color: selected.color
				},
			'&:not(:first-child)': {
				borderColor
			}
		}
	}
}

const generateDropdownStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor }
	} = themedStyles[themeType]

	const {
		base: { background, boxShadow }
	} = dropdownStyles[themeType]

	return {
		'& .ant-picker-panel-container': {
			'& .ant-picker-panel': {
				'& .ant-picker-footer': {
					borderTopColor: borderColor
				},
				...generateTimePanelColumnStyles(themeType),
				borderColor
			},
			backgroundColor: background,
			boxShadow
		}
	}
}

const generateTimeInputStyles = (themeType: ThemeType) => {
	const {
		base: { color },
		error,
		focus,
		hover,
		placeholder
	} = themedStyles[themeType]

	const {
		base: { background, borderColor },
		disabled
	} = inputPalette[themeType]

	return {
		'&.ant-picker': {
			'& .ant-picker-input': {
				'& .ant-picker-clear': {
					background,
					color: disabled.color
				},
				'& .ant-picker-suffix': { color: disabled.color },
				'& > input': {
					'&::placeholder': {
						color: placeholder.color
					},
					color
				}
			},
			'&$error': {
				'&:hover, &.ant-picker-focused': {
					borderColor: error.borderColor
				},
				...fieldErrorStyles.error,
				borderColor: error.borderColor
			},
			'&.ant-picker-disabled': {
				'&:hover': {
					borderColor
				},
				background: disabled.background
			},
			'&.ant-picker-focused': {
				borderColor: focus.borderColor,
				boxShadow: focus.boxShadow
			},
			'&:hover': {
				borderColor: hover.borderColor
			},
			background,
			borderColor,
			borderRadius,
			color
		}
	}
}

export const useStyles = createUseStyles({
	dropdown: generateDropdownStyles(light),
	error: {},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $button': generateButtonStyles(dark),
			'& $div': generateTimeInputStyles(dark),
			'& $dropdown': generateDropdownStyles(dark)
		},
		button: generateButtonStyles(light),
		div: generateTimeInputStyles(light)
	}
})

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
