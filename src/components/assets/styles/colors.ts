import { ColorManipulationTypes, manipulateColor } from 'components/utils'

const { shade, tint } = ColorManipulationTypes

const black = '#282A35'
const white = '#FEFEFE'
const gray = '#EAEAEB'

const blue = '#2F54EB'
const green = '#59C93D'
const orange = '#EEAB47'
const red = '#EE5C47'

interface Base {
	base: string
}

interface Blacks extends Base {
	'lighten-80': string
	'lighten-70': string
	'lighten-60': string
	'lighten-50': string
	'lighten-40': string
	'lighten-30': string
	'lighten-20': string
	'lighten-10': string
	'darken-10': string
	'darken-20': string
	'darken-40': string
}

interface Grays extends Base {
	'lighten-70': string
	'lighten-40': string
}

const percentages: Record<string, any> = {
	black: { darken: [10, 20, 40], lighten: [10, 20, 30, 40, 50, 60, 70, 80] },
	gray: { lighten: [40, 70] }
}

const generateTints = (baseColor: string, percentArr: number[] = []) => {
	const shades = {} as Record<string, string>

	percentArr.forEach(percentage => {
		const shadeKey = `lighten-${percentage}`
		shades[shadeKey] = manipulateColor(baseColor, percentage, tint)
	})

	return shades
}

const generateShades = (baseColor: string, percentArr: number[] = []) => {
	const shades = {} as Record<string, string>

	percentArr.forEach(percentage => {
		const shadeKey = `darken-${percentage}`
		shades[shadeKey] = manipulateColor(baseColor, percentage, shade)
	})

	return shades
}

const generateTintsAndShades = (baseColor: string) => {
	const shades = {
		base: baseColor,
		...generateTints(baseColor, percentages[baseColor]?.lighten),
		...generateShades(baseColor, percentages[baseColor]?.darken)
	}

	return shades
}

export interface ColorsType {
	blacks: Blacks
	blues: { base: string }
	grays: Grays
	greens: { base: string }
	oranges: { base: string }
	reds: { base: string }
	whites: { base: string }
}

const colors: ColorsType = {
	blacks: generateTintsAndShades(black) as Blacks,
	blues: { base: blue },
	grays: generateTintsAndShades(gray) as Grays,
	greens: { base: green },
	oranges: { base: orange },
	reds: { base: red },
	whites: { base: white }
}

export default colors
