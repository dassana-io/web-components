import { dassanaBlue, dassanaGrays, dassanaReds, dassanaWhite } from './colors'

export interface Theme {
	background: string
	primary: string
	error: string
	text: { disabled: string; primary: string }
}

export const lightPalette: Theme = {
	background: dassanaWhite,
	error: dassanaReds[6],
	primary: dassanaBlue,
	text: {
		disabled: dassanaGrays[6],
		primary: dassanaGrays[8]
	}
}

export const darkPalette: Theme = {
	background: dassanaGrays[9],
	error: dassanaReds[6],
	primary: dassanaBlue,
	text: {
		disabled: dassanaWhite,
		primary: dassanaWhite
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
