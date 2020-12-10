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
		base: { borderColor, color },
		hover
	} = themedStyles[themeType]

	const { hoverBorderColor } = iconBtnPalette[themeType]

	return {
		'&:hover': {
			borderColor: hoverBorderColor,
			color: hover.color
		},
		borderColor,
		color
	}
}
