import { ColorManipulationTypes, manipulateColor } from 'components/utils'

const { shade, tint } = ColorManipulationTypes

const black = '#282A35'
const white = '#FFFFFF'

const blue = '#2F54EB'
const green = '#59C93D'
const orange = 'EEAB47'
const red = '#EE5C47'

const lightenPercentages = [10, 20, 30, 40, 50, 60, 70, 80, 90]
const darkenPercentages = [10, 20]

interface LightShadeType {
	'lighten-90': string
	'lighten-80': string
	'lighten-70': string
	'lighten-60': string
	'lighten-50': string
	'lighten-40': string
	'lighten-30': string
	'lighten-20': string
	'lighten-10': string
}

interface DarkShadeType {
	'darken-10': string
	'darken-20': string
}

interface ShadeType extends LightShadeType, DarkShadeType {
	base: string
}

const generateLightShades = (baseColor: string, percentArr: number[]) => {
	const shades: LightShadeType = {} as LightShadeType

	percentArr.forEach(percentage => {
		const shadeKey = `lighten-${percentage}` as keyof LightShadeType
		shades[shadeKey] = manipulateColor(baseColor, percentage, tint)
	})

	return shades
}

const generateDarkShades = (baseColor: string, percentArr: number[]) => {
	const shades: DarkShadeType = {} as DarkShadeType

	percentArr.forEach(percentage => {
		const shadeKey = `darken-${percentage}` as keyof DarkShadeType
		shades[shadeKey] = manipulateColor(baseColor, percentage, shade)
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

export const whites = { base: white }
export const blues = generateShades(blue)
export const blacks = generateShades(black)
export const greens = { base: green }
export const oranges = { base: orange }
export const reds = { base: red }
