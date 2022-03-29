import { styleguide, themes, ThemeType } from '../assets/styles'

const {
	colors: { blacks, grays }
} = styleguide

const { dark, light } = ThemeType

export const markdownPalette = {
	[dark]: {
		codeBackground: themes[dark].state.loading.primary,
		color: themes[dark].text.primary,
		lineBreak: blacks['lighten-30'],
		preBackground: themes[dark].background.secondary
	},
	[light]: {
		codeBackground: themes[light].state.loading.primary,
		color: themes[light].text.primary,
		lineBreak: grays.base,
		preBackground: themes[light].background.secondary
	}
}
