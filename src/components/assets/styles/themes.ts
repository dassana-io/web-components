import colors from './colors'

const { blacks, greens, grays, oranges, reds, whites } = colors

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
		disabled: { background: string; border: string }
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
		primary: grays['lighten-70'],
		secondary: whites.base
	},
	border: grays.base,
	primary: blacks.base,
	secondary: blacks['lighten-30'],
	state: {
		active: blacks.base,
		disabled: { background: grays['lighten-40'], border: grays.base },
		error: reds.base,
		hover: blacks.base,
		inactive: blacks['lighten-70'],
		loading: {
			primary: grays.base,
			secondary: grays['lighten-40']
		},
		success: greens.base,
		warning: oranges.base
	},
	text: {
		disabled: blacks['lighten-80'],
		primary: blacks['lighten-30']
	}
}

const darkPalette: Theme = {
	background: {
		primary: blacks['darken-40'],
		secondary: blacks.base
	},
	border: blacks['lighten-10'],
	primary: blacks['lighten-50'],
	secondary: blacks['lighten-30'],
	state: {
		active: grays.base,
		disabled: {
			background: blacks['darken-20'],
			border: blacks['darken-20']
		},
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
		backgroundColor: state.disabled.background,
		borderColor: state.disabled.border,
		color: text.disabled
	}

	const errorStyles = {
		borderColor: state.error,
		color: state.error
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

export const dropdownStyles = {
	[dark]: {
		background: blacks['darken-40'],
		boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
	},
	[light]: {
		background: whites.base,
		boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
	}
}
