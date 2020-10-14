import {
	border,
	borderRadius,
	fieldErrorStyles
} from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const borderStyles = {
	border,
	borderRadius
}

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
			...borderStyles,
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
		}
	}
}

export const generateInputSkeletonStyles = (themeType: ThemeType) => {
	const { loading } = themedStyles[themeType]

	return {
		...borderStyles,
		borderColor: loading.border,
		padding: '6px 14px'
	}
}
