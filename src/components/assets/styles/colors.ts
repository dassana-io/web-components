import { ColorManipulationTypes, manipulateColor } from 'components/utils'

const { shade, tint } = ColorManipulationTypes

enum Colors {
	black = 'black',
	blue = 'blue',
	gray = 'gray',
	green = 'green',
	orange = 'orange',
	red = 'red',
	white = 'white',
	yellow = 'yellow'
}

const { black, blue, gray, green, orange, red, white, yellow } = Colors

const baseColors = {
	[black]: '#282A35',
	[blue]: '#2F54EB',
	[gray]: '#EAEAEB',
	[green]: '#59C93D',
	[orange]: '#EE9747',
	[red]: '#EE4747',
	[white]: '#FEFEFE',
	[yellow]: '#EEB547'
}

interface Base {
	base: string
}

interface BlackTints {
	'lighten-80': string
	'lighten-70': string
	'lighten-60': string
	'lighten-50': string
	'lighten-40': string
	'lighten-30': string
	'lighten-20': string
	'lighten-10': string
}

interface BlackShades {
	'darken-10': string
	'darken-20': string
	'darken-40': string
}

type Blacks = Base & BlackShades & BlackTints

interface Grays extends Base {
	'lighten-70': string
	'lighten-40': string
}

interface Reds extends Base {
	'darken-20': string
}

const percentages: Record<string, any> = {
	[black]: {
		darken: [10, 20, 40],
		lighten: [10, 20, 30, 40, 50, 60, 70, 80]
	},
	[gray]: { lighten: [40, 70] },
	[red]: { darken: [20] }
}

interface GenerateColors {
	(
		baseColor: string,
		type: ColorManipulationTypes.shade | ColorManipulationTypes.tint,
		percentArr: number[]
	): Record<string, string>
}

const generateColors: GenerateColors = (baseColor, type, percentArr = []) => {
	const colors = {} as Record<string, string>

	percentArr.forEach(percentage => {
		const key =
			type === shade ? `darken-${percentage}` : `lighten-${percentage}`

		colors[key] = manipulateColor(baseColor, percentage, type)
	})

	return colors
}

const generateTintsAndShades = (color: Colors) => ({
	base: baseColors[color],
	...generateColors(baseColors[color], tint, percentages[color]?.lighten),
	...generateColors(baseColors[color], shade, percentages[color]?.darken)
})

export interface ColorsType {
	blacks: Blacks
	blues: Base
	grays: Grays
	greens: Base
	oranges: Base
	reds: Reds
	whites: Base
	yellows: Base
}

const colors: ColorsType = {
	blacks: generateTintsAndShades(black) as Blacks,
	blues: { base: baseColors[blue] },
	grays: generateTintsAndShades(gray) as Grays,
	greens: { base: baseColors[green] },
	oranges: { base: baseColors[orange] },
	reds: generateTintsAndShades(red) as Reds,
	whites: { base: baseColors[white] },
	yellows: { base: baseColors[yellow] }
}

export default colors
