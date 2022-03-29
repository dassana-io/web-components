import { generateLinkStyles } from 'components/Link/utils'
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

export const generateThemedMarkdownCodeStyles = (theme: ThemeType) => ({
	backgroundColor: themes[theme].state.loading.primary
})

export const generateThemedMarkdownPreStyles = (theme: ThemeType) => ({
	'& code': {
		backgroundColor: 'transparent'
	},
	backgroundColor: themes[theme].background.secondary
})

export const generateThemedMarkdownStyles = (theme: ThemeType) => ({
	'& a': generateLinkStyles(theme)['&.ant-typography'],
	'& h1, & h2': {
		borderBottomColor: markdownPalette[theme].lineBreak
	},
	'& hr': {
		backgroundColor: markdownPalette[theme].lineBreak
	},
	'& img': {
		backgroundColor: 'transparent'
	},
	color: themes[theme].text.primary
})
