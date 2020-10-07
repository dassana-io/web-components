import { ColorManipulationTypes, manipulateColor } from '../../utils'

const { lighten, darken } = ColorManipulationTypes

const white = '#FEFEFE'
const black = '#111111'

const blue = '#2F54EB'
const gray = '#7E8083'
const green = '#81E154'
const orange = '#F9BB5D'
const red = '#E16854'
const yellow = '#F9D75D'

const lightenPercentages = [10, 30, 50, 70, 90]
const darkenPercentages = [10, 20, 50, 70]

interface LightShadeType {
	'lighten-90': string
	'lighten-70': string
	'lighten-50': string
	'lighten-30': string
	'lighten-10': string
}

interface DarkShadeType {
	'darken-10': string
	'darken-20': string
	'darken-50': string
	'darken-70': string
}

interface ShadeType extends LightShadeType, DarkShadeType {
	base: string
}

const generateLightShades = (baseColor: string, percentArr: number[]) => {
	const shades: LightShadeType = {} as LightShadeType

	percentArr.forEach(percentage => {
		const shadeKey = `lighten-${percentage}` as keyof LightShadeType
		shades[shadeKey] = manipulateColor(baseColor, percentage, lighten)
	})

	return shades
}

const generateDarkShades = (baseColor: string, percentArr: number[]) => {
	const shades: DarkShadeType = {} as DarkShadeType

	percentArr.forEach(percentage => {
		const shadeKey = `darken-${percentage}` as keyof DarkShadeType
		shades[shadeKey] = manipulateColor(baseColor, percentage, darken)
	})

	return shades
}

const generateShades = (baseColor: string) => {
	const shades: ShadeType = {
		base: baseColor,
		...generateLightShades(baseColor, lightenPercentages),
		...generateDarkShades(baseColor, darkenPercentages)
	}

	return shades
}

/* eslint-disable sort-keys */
export const whites = {
	base: white,
	'darken-5': manipulateColor(white, 5, darken),
	'darken-10': manipulateColor(white, 10, darken),
	'darken-15': manipulateColor(white, 15, darken),
	'darken-20': manipulateColor(white, 20, darken)
}
export const blacks = {
	...generateLightShades(black, lightenPercentages),
	base: black
}

export const blues = generateShades(blue)
export const grays = generateShades(gray)
export const greens = { base: green }
export const oranges = { base: orange }
export const reds = { base: red }
export const yellows = { base: yellow }
