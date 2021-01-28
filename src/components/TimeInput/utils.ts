import { createUseStyles } from 'react-jss'
import { TimeFormat } from './index'
import {
	fieldErrorStyles,
	styleguide
} from 'components/assets/styles/styleguide'
import moment, { MomentInputObject } from 'moment'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

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
	container: {},
	error: {},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $div': generateTimeInputStyles(dark)
		},
		div: generateTimeInputStyles(light)
	}
})
