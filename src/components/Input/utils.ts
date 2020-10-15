import {
	fieldErrorStyles,
	styleguide
} from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { border, borderRadius } = styleguide

export const generateInputStyles = (themeType: ThemeType) => {
	const { base, disabled, error, focus, hover, placeholder } = themedStyles[
		themeType
	]

	return {
		'&.ant-input': {
			'&$error': {
				...fieldErrorStyles.error,
				borderColor: error.borderColor
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

export const generateInputSkeletonStyles = (themeType: ThemeType) => {
	const { loading } = themedStyles[themeType]

	return {
		border,
		borderColor: loading.borderColor,
		borderRadius,
		padding: '6px 14px'
	}
}
