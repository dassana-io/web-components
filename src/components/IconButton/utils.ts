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
		disabled: { backgroundColor, color }
	} = themedStyles[themeType]

	return {
		'&$circle': {
			backgroundColor
		},
		'&$circle:hover': {
			border: `1px solid ${borderColor}`
		},
		'&$iconButton': {
			color,
			cursor: 'not-allowed'
		},
		'&$iconButton:hover': {
			color
		}
	}
}

export const generateThemedCircleButtonStyles = (themeType: ThemeType) => {
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
