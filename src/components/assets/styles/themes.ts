import colors from './colors'
import { ColorManipulationTypes, manipulateColor } from 'components/utils'

const { blacks, blues, greens, oranges, reds, whites } = colors

export enum ThemeType {
	dark = 'dark',
	light = 'light'
}

const { dark, light } = ThemeType

export interface Theme {
	action: {
		active: string
		disabled: string
	}
	background: {
		primary: string
		secondary: string
	}
	border: string
	primary: string
	error: string
	success: string
	text: { disabled: string; primary: string }
	warning: string
}

const lightPalette: Theme = {
	action: {
		active: blacks.base,
		disabled: blacks['lighten-90'] // update when defined by Design
	},
	background: {
		primary: whites.base,
		secondary: blacks['lighten-90']
	},
	border: blacks['lighten-80'],
	error: reds.base,
	primary: blues.base,
	success: greens.base,
	text: {
		disabled: blacks['lighten-70'], // update when defined by Design
		primary: blacks['lighten-30']
	},
	warning: oranges.base
}

const darkPalette: Theme = {
	action: {
		active: whites.base,
		disabled: blacks['lighten-20'] // update when defined by Design
	},
	background: {
		primary: blacks.base,
		secondary: blacks['darken-20']
	},
	border: blacks['darken-20'],
	error: reds.base,
	primary: blues.base,
	success: greens.base,
	text: {
		disabled: blacks['lighten-20'], // update when defined by Design
		primary: blacks['lighten-50']
	},
	warning: oranges.base
}

const generateThemedStyles = (themeType: ThemeType) => {
	const { action, background, border, error, primary, text } = themes[
		themeType
	]

	const base = {
		backgroundColor: background.primary,
		borderColor: border,
		color: text.primary
	}

	const disabled = {
		backgroundColor: action.disabled,
		color: text.disabled
	}

	const errorStyles = {
		border: `1px solid ${error}`
	}

	const hover = {
		borderColor: blues['lighten-10'] // update when defined by Design
	}

	const focus = {
		...hover,
		boxShadow: `0px 0px 4px ${manipulateColor(
			primary,
			50,
			ColorManipulationTypes.fade
		)}` // update when defined by Design
	}

	const loading = {
		border: `1px solid ${
			themeType === dark ? blacks['lighten-10'] : blacks['lighten-90']
		}`,
		borderRadius: 4
	}

	const placeholder = {
		color: text.disabled // update when defined by Design
	}

	return {
		base,
		disabled,
		error: errorStyles,
		focus,
		hover,
		loading,
		placeholder
	}
}

export const themes = {
	[ThemeType.dark]: darkPalette,
	[ThemeType.light]: lightPalette
}

export const themedStyles = {
	[ThemeType.dark]: generateThemedStyles(dark),
	[ThemeType.light]: generateThemedStyles(light)
}
