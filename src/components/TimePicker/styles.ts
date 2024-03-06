import { styleguide, themes, ThemeType } from '../assets/styles'

const {
	colors: { blacks, grays }
} = styleguide

export const colorPalette = {
	[ThemeType.dark]: {
		headerColor: grays.base,
		hoverBackground: blacks['lighten-20']
	},
	[ThemeType.light]: {
		headerColor: blacks['lighten-10'],
		hoverBackground: grays['lighten-40']
	}
}

export const generateThemedBorderStyles = (theme: ThemeType) => ({
	border: `1px solid ${themes[theme].border}`
})

export const generateThemedContainerStyles = (theme: ThemeType) => ({
	backgroundColor: themes[theme].background.secondary
})

export const generateThemedMenuStyles = (theme: ThemeType) => ({
	'&:hover': {
		backgroundColor: colorPalette[theme].hoverBackground
	}
})

export const generateThemedStyles = (theme: ThemeType) => ({
	borderRight: `1px solid ${themes[theme].border}`
})
