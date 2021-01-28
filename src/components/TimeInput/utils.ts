import { createUseStyles } from 'react-jss'
import { generateButtonStyles } from 'components/Button/utils'
import { TimeFormat } from './index'
import {
	dropdownStyles,
	themedStyles,
	ThemeType
} from 'components/assets/styles/themes'
import {
	fieldErrorStyles,
	styleguide
} from 'components/assets/styles/styleguide'
import moment, { MomentInputObject } from 'moment'

const { borderRadius } = styleguide
const { dark, light } = ThemeType

const hourIntegerFormat = 'HH'

export const formatTime = (format: TimeFormat, value?: number) => {
	if (!value && typeof value !== 'number') return value

	if (format === 'unix') {
		return moment.unix(value)
	}

	return moment(value, hourIntegerFormat)
}

export const parseTime = (momentObj: MomentInputObject, format: TimeFormat) => {
	return format === 'unix'
		? moment(momentObj).unix()
		: parseInt(moment(momentObj).format(hourIntegerFormat))
}

// -x-x-x-x-x-x-x-x- Styles Related -x-x-x-x-x-x-x-x-

const generateDropdownStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	const {
		base: { background, boxShadow },
		hover,
		selected
	} = dropdownStyles[themeType]

	return {
		'& .ant-picker-panel-container': {
			'& .ant-picker-panel': {
				'& .ant-picker-footer': {
					borderTopColor: borderColor
				},
				'& .ant-picker-time-panel-column': {
					'& > li.ant-picker-time-panel-cell': {
						'& .ant-picker-time-panel-cell-inner': {
							'&:hover': { background: hover.background },
							color
						},
						'&.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner:hover': {
							background: selected.background
						}
					},
					'& > li.ant-picker-time-panel-cell-selected div.ant-picker-time-panel-cell-inner': {
						background: selected.background,
						color: selected.color
					},
					'&:not(:first-child)': {
						borderColor
					}
				},
				borderColor
			},
			backgroundColor: background,
			boxShadow
		}
	}
}

const generateTimeInputStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, borderColor, color },
		disabled,
		error,
		focus,
		hover,
		placeholder
	} = themedStyles[themeType]

	return {
		'&.ant-picker': {
			'& .ant-picker-input': {
				'& .ant-picker-clear': {
					backgroundColor,
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
				backgroundColor: disabled.backgroundColor
			},
			'&.ant-picker-focused': {
				borderColor: focus.borderColor,
				boxShadow: focus.boxShadow
			},
			'&:hover': {
				borderColor: hover.borderColor
			},

			backgroundColor: backgroundColor,
			borderColor: borderColor,
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
