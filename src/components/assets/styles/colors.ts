import { ColorManipulationTypes, manipulateColor } from 'components/utils'

const { shade, tint } = ColorManipulationTypes

enum Colors {
	azure = 'azure',
	black = 'black',
	blue = 'blue',
	cyan = 'cyan',
	gray = 'gray',
	green = 'green',
	magenta = 'magenta',
	orange = 'orange',
	purple = 'purple',
	red = 'red',
	white = 'white',
	yellow = 'yellow'
}

const {
	azure,
	black,
	blue,
	cyan,
	gray,
	green,
	magenta,
	orange,
	purple,
	red,
	white,
	yellow
} = Colors

const baseColors = {
	[azure]: '#69C0FF',
	[black]: '#282A35',
	[blue]: '#2F54EB',
	[cyan]: '#13C2C2',
	[gray]: '#EAEAEB',
	[green]: '#59C93D',
	[magenta]: '#EB2F96',
	[orange]: '#EE9747',
	[purple]: '#722ED1',
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
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

interface Blues extends Base {
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

interface Cyans extends Base {
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

interface Greens extends Base {
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

interface Oranges extends Base {
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

interface Magentas extends Base {
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

interface Purples extends Base {
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

interface Yellows extends Base {
	'darken-10': string
	'darken-20': string
	'darken-30': string
	'darken-40': string
	'lighten-10': string
	'lighten-20': string
	'lighten-30': string
	'lighten-40': string
	'lighten-50': string
}

const percentages: Record<string, any> = {
	[black]: {
		darken: [10, 20, 40],
		lighten: [10, 20, 30, 40, 50, 60, 70, 80]
	},
	[blue]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	},
	[cyan]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	},
	[gray]: { lighten: [40, 70] },
	[green]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	},
	[magenta]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	},
	[orange]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	},
	[purple]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	},
	[red]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	},
	[yellow]: {
		darken: [10, 20, 30, 40],
		lighten: [10, 20, 30, 40, 50]
	}
}

type GenerateColors = (
	baseColor: string,
	type: ColorManipulationTypes.shade | ColorManipulationTypes.tint,
	percentArr: number[]
) => Record<string, string>

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
	azures: Base
	blacks: Blacks
	blues: Blues
	cyans: Cyans
	grays: Grays
	greens: Greens
	magentas: Magentas
	oranges: Oranges
	purples: Purples
	reds: Reds
	whites: Base
	yellows: Yellows
}

const colors: ColorsType = {
	azures: { base: baseColors[azure] },
	blacks: generateTintsAndShades(black) as Blacks,
	blues: generateTintsAndShades(blue) as Blues,
	cyans: generateTintsAndShades(cyan) as Cyans,
	grays: generateTintsAndShades(gray) as Grays,
	greens: generateTintsAndShades(green) as Greens,
	magentas: generateTintsAndShades(magenta) as Magentas,
	oranges: generateTintsAndShades(orange) as Oranges,
	purples: generateTintsAndShades(purple) as Purples,
	reds: generateTintsAndShades(red) as Reds,
	whites: { base: baseColors[white] },
	yellows: generateTintsAndShades(yellow) as Yellows
}

export default colors
