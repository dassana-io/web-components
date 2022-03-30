import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays }
} = styleguide

export const COLLAPSED_CONTAINER_HEIGHT = 30

export const colorPalette = {
	[dark]: {
		color: grays.base,
		disabledBackground: blacks['darken-20'],
		hoverBackground: blacks['lighten-20'],
		pauseColor: blacks['lighten-50'],
		secondaryBackground: blacks['darken-10']
	},
	[light]: {
		color: blacks['lighten-10'],
		disabledBackground: grays['lighten-40'],
		hoverBackground: grays['lighten-40'],
		pauseColor: grays.base,
		secondaryBackground: grays['lighten-40']
	}
}

export const generatedThemedHeightToggleStyles = (theme: ThemeType) => ({
	'&:hover': {
		backgroundColor: colorPalette[theme].hoverBackground
	},
	backgroundColor: colorPalette[theme].secondaryBackground,
	border: `1px solid ${themedStyles[theme].base.borderColor}`
})

export const generatedThemedQueryContainerStyles = (theme: ThemeType) => ({
	backgroundColor: colorPalette[theme].secondaryBackground,
	color: colorPalette[theme].color
})
