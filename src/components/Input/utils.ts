import { fieldErrorStyles } from '../assets/styles/styleguide'
import { themedStyles, ThemeType } from '../assets/styles/themes'

export const generateInputStyles = (themeType: ThemeType) => {
	const { base, disabled, error, focus, hover, placeholder } = themedStyles[
		themeType
	]

	return {
		'&.ant-input': {
			'&::placeholder': {
				color: placeholder.color
			},
			'&:hover': {
				borderColor: hover.borderColor
			},
			backgroundColor: base.backgroundColor,
			borderColor: base.borderColor,
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
		},
		'&.ant-input.error': { ...fieldErrorStyles.error, border: error.border }
	}
}
