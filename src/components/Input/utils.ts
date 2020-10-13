import colors from 'components/assets/styles/colors'
import { fieldErrorStyles } from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { blacks } = colors

const { dark } = ThemeType

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

export const generateInputSkeletonStyles = (themeType: ThemeType) => {
	const borderColor =
		themeType === dark ? blacks['lighten-10'] : blacks['lighten-90']

	return {
		border: `1px solid ${borderColor}`,
		borderRadius: '4px',
		padding: '6px 14px'
	}
}
