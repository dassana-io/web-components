import colors from './colors'

const { blacks, greens, oranges, reds, whites } = colors

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
	secondary: string
	state: {
		active: string
		disabled: string
		error: string
		hover: string
		inactive: string
		loading: {
			primary: string
			secondary: string
		}
		success: string
		warning: string
	}
	text: { disabled: string; primary: string }
}

const lightPalette: Theme = {
	background: {
		primary: whites.base,
		secondary: blacks['lighten-90']
	},
	border: blacks['lighten-80'],
	primary: blacks.base,
	secondary: blacks['lighten-30'],
	state: {
		active: blacks.base,
		disabled: blacks['lighten-90'],
		error: reds.base,
		hover: blacks.base,
		inactive: blacks['lighten-70'],
		loading: {
			primary: blacks['lighten-90'],
			secondary: whites['darken-5']
		},
		success: greens.base,
		warning: oranges.base
	},
	text: {
		disabled: blacks['lighten-70'],
		primary: blacks['lighten-30']
	}
}

const darkPalette: Theme = {
	background: {
		primary: blacks.base,
		secondary: blacks['darken-20']
	},
	border: blacks['lighten-20'],
	primary: blacks['lighten-50'],
	secondary: blacks['lighten-30'],
	state: {
		active: whites.base,
		disabled: blacks['lighten-10'],
		error: reds.base,
		hover: blacks['lighten-80'],
		inactive: blacks['lighten-20'],
		loading: {
			primary: blacks['lighten-10'],
			secondary: blacks['lighten-20']
		},
		success: greens.base,
		warning: oranges.base
	},
	text: {
		disabled: blacks['lighten-20'],
		primary: blacks['lighten-50']
	}
}

const generateThemedStyles = ({ state, background, border, text }: Theme) => {
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
		borderColor: state.error
	}

	const hover = {
		borderColor: state.hover,
		color: state.hover
	}

	const focus = {
		...hover,
		boxShadow: 'none'
	}

	const loading = {
		borderColor: state.loading.primary
	}

	const placeholder = {
		color: text.disabled
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
