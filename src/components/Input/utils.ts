import {
	fieldErrorStyles,
	styleguide
} from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { borderRadius, fontWeight } = styleguide

export const generateAddonStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, borderColor, color },
		error
	} = themedStyles[themeType]

	return {
		'&.ant-input-group-wrapper': {
			'& .ant-input-wrapper': {
				'& .ant-input-group-addon': {
					backgroundColor,
					borderColor,
					color,
					fontWeight: fontWeight.light
				},
				'& .ant-input-group-addon:first-child': {
					borderBottomLeftRadius: borderRadius,
					borderTopLeftRadius: borderRadius
				},
				'& .ant-input-group-addon:last-child': {
					borderBottomRightRadius: borderRadius,
					borderTopRightRadius: borderRadius
				}
			},
			'&$error': {
				'& .ant-input-wrapper .ant-input': {
					...fieldErrorStyles.error,
					borderColor: error.borderColor
				}
			}
		}
	}
}

export const generateInputStyles = (themeType: ThemeType) => {
	const { base, disabled, error, focus, hover, placeholder } = themedStyles[
		themeType
	]

	return {
		'&.ant-input': {
			'&$error': {
				'&$container': {
					...fieldErrorStyles.error,
					borderColor: error.borderColor
				}
			},
			'&::placeholder': {
				color: placeholder.color
			},
			'&:hover': {
				borderColor: hover.borderColor
			},
			backgroundColor: base.backgroundColor,
			borderColor: base.borderColor,
			borderRadius,
			color: base.color
		},
		'&.ant-input-disabled, &.ant-input[disabled]': {
			'&:hover': {
				borderColor: base.borderColor
			},
			backgroundColor: disabled.backgroundColor
		},
		'&.ant-input-focused, &.ant-input:focus': {
			borderColor: focus.borderColor,
			boxShadow: focus.boxShadow
		}
	}
}
