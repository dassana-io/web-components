import { blues, grays, reds, whites } from './colors'

export interface Theme {
	background: string
	primary: string
	error: string
	text: { disabled: string; primary: string }
}

export const lightPalette: Theme = {
	background: whites.base,
	error: reds.base,
	primary: blues.base,
	text: {
		disabled: grays.base,
		primary: grays['darken-20']
	}
}

export const darkPalette: Theme = {
	background: grays['darken-50'],
	error: reds.base,
	primary: blues.base,
	text: {
		disabled: whites.base,
		primary: whites.base
	}
}

export enum ThemesType {
	dark = 'dark',
	light = 'light'
}

export const themes = {
	[ThemesType.dark]: darkPalette,
	[ThemesType.light]: lightPalette
}
