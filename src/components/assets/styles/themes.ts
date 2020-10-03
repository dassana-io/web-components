import { dassanaBlue, dassanaGrays, dassanaReds, dassanaWhite } from './colors'

export interface ThemePalette {
	background: string
	primary: string
	error: string
	text: { disabled: string; primary: string }
}

export const lightPalette: ThemePalette = {
	background: dassanaWhite,
	error: dassanaReds[6],
	primary: dassanaBlue,
	text: {
		disabled: dassanaGrays[6],
		primary: dassanaGrays[8]
	}
}

export const darkPalette: ThemePalette = {
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

const { dark, light } = ThemesType

const themes = { [dark]: darkPalette, [light]: lightPalette }

export const getThemePalette = (theme: ThemesType) => themes[theme]
