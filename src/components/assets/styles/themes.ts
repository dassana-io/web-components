import colors from './colors'

const { blacks, blues, greens, oranges, reds, whites } = colors

export enum ThemeType {
	dark = 'dark',
	light = 'light'
}

const { dark, light } = ThemeType

export interface Theme {
	background: {
		primary: string
		secondary: string
	}
	border: string
	primary: string
	error: string
	state: {
		active: string
		disabled: string
		hover: string
		loading: {
			primary: string
			secondary: string
		}
	}
	success: string
	text: { disabled: string; primary: string }
	warning: string
}

const lightPalette: Theme = {
	background: {
		primary: whites.base,
		secondary: blacks['lighten-90']
	},
	border: blacks['lighten-80'],
	error: reds.base,
	primary: blues.base,
	state: {
		active: blacks.base,
		disabled: blacks['lighten-90'], // update when defined by Design
		hover: blacks['lighten-30'],
		loading: {
			primary: blacks['lighten-90'],
			secondary: whites['darken-5']
		}
	},
	success: greens.base,
	text: {
		disabled: blacks['lighten-70'], // update when defined by Design
		primary: blacks['lighten-30']
	},
	warning: oranges.base
}

const darkPalette: Theme = {
	background: {
		primary: blacks.base,
		secondary: blacks['darken-20']
	},
	border: blacks['lighten-20'],
	error: reds.base,
	primary: blues.base,
	state: {
		active: whites.base,
		disabled: blacks['lighten-10'], // update when defined by Design

		hover: blacks['lighten-60'],
		loading: {
			primary: blacks['lighten-10'],
			secondary: blacks['lighten-20']
		}
	},
	success: greens.base,
	text: {
		disabled: blacks['lighten-20'], // update when defined by Design
		primary: blacks['lighten-50']
	},
	warning: oranges.base
}

const generateThemedStyles = ({
	state,
	background,
	border,
	error,
	text
}: Theme) => {
	const base = {
		backgroundColor: background.primary,
		borderColor: border,
		color: text.primary
	}

	const disabled = {
		backgroundColor: state.disabled,
		color: text.disabled
	}

	const errorStyles = {
		border: `1px solid ${error}`
	}

	const hover = {
		borderColor: state.hover
	}

	const focus = {
		...hover,
		boxShadow: 'none'
	}

	const loading = {
		border: `1px solid ${state.loading.primary}`
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
	[ThemeType.dark]: generateThemedStyles(themes[dark]),
	[ThemeType.light]: generateThemedStyles(themes[light])
}
