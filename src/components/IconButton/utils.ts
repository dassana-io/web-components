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
