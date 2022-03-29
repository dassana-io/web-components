import { styleguide, ThemeType } from '../assets/styles'

const {
	colors: { blacks, grays }
} = styleguide

export const COLLAPSED_CONTAINER_HEIGHT = 30

export const colorPalette = {
	[ThemeType.dark]: {
		color: grays.base,
		disabledBackground: blacks['darken-20'],
		hoverBackground: blacks['lighten-20'],
		pauseColor: blacks['lighten-50'],
		secondaryBackground: blacks['darken-10']
	},
	[ThemeType.light]: {
		color: blacks['lighten-10'],
		disabledBackground: grays['lighten-40'],
		hoverBackground: grays['lighten-40'],
		pauseColor: grays.base,
		secondaryBackground: grays['lighten-40']
	}
}
