import { buttonPalette } from 'components/Button/utils'
import { getRgba } from 'components/utils'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	colors: { blacks }
} = styleguide

const { light, dark } = ThemeType

const iconBtnPalette = {
	[dark]: {
		hoverBorderColor: blacks['lighten-40']
	},
	[light]: {
		hoverBorderColor: blacks['lighten-50']
	}
}

export const generateThemedIconBtnStyles = (themeType: ThemeType) => {
	const {
		base: { color },
		hover
	} = themedStyles[themeType]

	return {
		'&:hover': {
			color: hover.color
		},
		color
	}
}

export const generateThemedDisabledStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor },
		disabled: { color: disabledColor }
	} = themedStyles[themeType]
	const { disabledBgColor } = buttonPalette[themeType]

	return {
		'&$circle': {
			backgroundColor: disabledBgColor
		},
		'&$circle:hover': {
			backgroundColor: disabledBgColor,
			borderColor
		},
		'&$iconButton': {
			color: disabledColor,
			cursor: 'not-allowed'
		},
		'&$iconButton:hover': {
			color: disabledColor
		}
	}
}

export const generateThemedHasBorderStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor }
	} = themedStyles[themeType]

	const { hoverBorderColor } = iconBtnPalette[themeType]

	return {
		'&:hover': {
			border: `1px solid ${hoverBorderColor}`
		},
		border: `1px solid ${borderColor}`
	}
}

export const generateThemedPendingStyles = (themeType: ThemeType) => {
	const { hoverBorderColor } = iconBtnPalette[themeType]

	return {
		border: `3px solid ${getRgba(hoverBorderColor, 0.2)}`,
		'border-left-color': hoverBorderColor
	}
}

export const generateThemedPrimaryStyles = (themeType: ThemeType) => {
	const {
		disabled: { color: disabledColor }
	} = themedStyles[themeType]
	const { disabledBgColor, primaryBackgroundColor, primaryHoverBgColor } =
		buttonPalette[themeType]

	return {
		'&$circle': {
			'&$disabled': {
				'&:hover': {
					backgroundColor: disabledBgColor,
					borderColor: disabledBgColor,
					color: disabledColor
				},
				backgroundColor: disabledBgColor,
				color: disabledColor
			},
			'&:hover': {
				backgroundColor: primaryHoverBgColor,
				color: blacks['lighten-80']
			}
		},
		backgroundColor: primaryBackgroundColor,
		borderColor: 'transparent',
		color: blacks['lighten-80']
	}
}
