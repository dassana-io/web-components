import { fieldErrorStyles } from '../assets/styles/styleguide'
import { generalStyles } from '../assets/styles/baseStyles'
import { ThemeType } from '../assets/styles/themes'

export const generateInputStyles = (themeType: ThemeType) => {
	const { base, disabled, focus, hover, placeholder } = generalStyles[
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
			backgroundColor: base.bgColor,
			borderColor: base.borderColor,
			color: base.color
		},
		'&.ant-input-disabled, &.ant-input[disabled]': {
			'&:hover': {
				borderColor: base.borderColor
			},
			backgroundColor: disabled.bgColor
		},
		'&.ant-input-focused, &.ant-input:focus': {
			borderColor: focus.borderColor,
			boxShadow: focus.boxShadow
		},
		'&.ant-input.error': fieldErrorStyles.error
	}
}
