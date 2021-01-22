import {
	fieldErrorStyles,
	styleguide
} from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { borderRadius } = styleguide

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

export const generateAddonStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, borderColor, color }
	} = themedStyles[themeType]

	return {
		'&.ant-input-wrapper': {
			'& .ant-input-group-addon': {
				backgroundColor,
				borderColor,
				color
			},
			'& .ant-input-group-addon:first-child': {
				borderBottomLeftRadius: borderRadius,
				borderTopLeftRadius: borderRadius
			},
			'& .ant-input-group-addon:last-child': {
				borderBottomRightRadius: borderRadius,
				borderTopRightRadius: borderRadius
			}
		}
	}
}

export const generateInputSkeletonStyles = (themeType: ThemeType) => {
	const { loading } = themedStyles[themeType]

	return {
		border: `1px solid ${loading.borderColor}`,
		borderRadius,
		padding: '6px 14px'
	}
}
