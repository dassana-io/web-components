import { dassanaBlue, dassanaGrays, dassanaReds, dassanaWhite } from './colors'

interface TextColorType {
	disabled: string
	primary: string
}
export interface PaletteType {
	background: string
	primary: string
	error: string
	text: TextColorType
}

export const light: PaletteType = {
	background: dassanaWhite,
	error: dassanaReds[6],
	primary: dassanaBlue,
	text: {
		disabled: dassanaGrays[6],
		primary: dassanaGrays[8]
	}
}

export const dark: PaletteType = {
	background: dassanaGrays[9],
	error: dassanaReds[6],
	primary: dassanaBlue,
	text: {
		disabled: dassanaWhite,
		primary: dassanaWhite
	}
}

const themes = { dark, light }

export type ThemesType = keyof typeof themes

export const generateThemeVars = (theme: ThemesType) => themes[theme]
