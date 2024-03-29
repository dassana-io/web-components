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
		disabled: { background: string, border: string }
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
	text: { disabled: string, primary: string }
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

/* ----- Common Styles and Palettes ----- */

export const dropdownStyles = {
	[dark]: {
		base: {
			background: blacks['darken-40'],
			boxShadow: '0px 2px 8px rgba(255, 255, 255, 0.08)'
		},
		hover: {
			background: blacks.base
		},
		selected: {
			background: blacks['lighten-10'],
			color: grays.base
		}
	},
	[light]: {
		base: {
			background: whites.base,
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
		},
		hover: {
			background: grays['lighten-40']
		},
		selected: {
			background: grays.base,
			color: blacks.base
		}
	}
}

export const inputPalette = {
	[dark]: {
		base: {
			background: blacks['darken-40'],
			borderColor: blacks['lighten-20']
		},
		disabled: {
			background: blacks.base,
			color: blacks['lighten-30']
		}
	},
	[light]: {
		base: {
			background: whites.base,
			borderColor: blacks['lighten-80']
		},
		disabled: {
			background: grays.base,
			color: blacks['lighten-70']
		}
	}
}

export const colorPalette = {
	[dark]: {
		cardBackground: blacks.base,
		color: grays.base,
		disabledBackground: blacks['darken-20'],
		emphasisColor: blacks['lighten-70'],
		hoverBackground: blacks['lighten-20'],
		hoverBorderColor: blacks['lighten-40'],
		pauseColor: blacks['lighten-50'],
		popoverBackground: blacks.base,
		secondaryBackground: blacks['darken-10'],
		secondaryColor: blacks['lighten-70'],
		secondaryPopoverBackground: blacks['darken-40'],
		tertiaryBackground: blacks['darken-20'],
		tertiaryColor: blacks['lighten-80']
	},
	[light]: {
		cardBackground: whites.base,
		color: blacks['lighten-10'],
		disabledBackground: grays['lighten-40'],
		emphasisColor: blacks['lighten-30'],
		hoverBackground: grays['lighten-40'],
		hoverBorderColor: blacks['lighten-50'],
		pauseColor: grays.base,
		popoverBackground: whites.base,
		secondaryBackground: grays['lighten-40'],
		secondaryColor: blacks['lighten-20'],
		secondaryPopoverBackground: grays['lighten-40'],
		tertiaryBackground: grays['lighten-70'],
		tertiaryColor: blacks['lighten-30']
	}
}
