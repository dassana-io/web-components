import { createUseStyles } from 'react-jss'
import { ColorManipulationTypes, manipulateColor } from 'components/utils'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const {
	colors: { blacks, grays, greens, reds, oranges },
	font,
	fontWeight,
	spacing
} = styleguide

const { light, dark } = ThemeType

const darkCommonColor = themedStyles[dark].base.color
const lightCommonColor = themedStyles[light].base.color

const { shade } = ColorManipulationTypes

const tokenColors = {
	[dark]: {
		boolean: reds.base,
		char: darkCommonColor,
		className: darkCommonColor,
		comment: darkCommonColor,
		function: darkCommonColor,
		keyword: reds.base,
		lineHighlight: darkCommonColor,
		method: darkCommonColor,
		number: reds.base,
		operator: darkCommonColor,
		primitive: darkCommonColor,
		property: oranges.base,
		punctuation: darkCommonColor,
		string: manipulateColor(greens.base, 20, shade),
		tag: darkCommonColor,
		variable: darkCommonColor
	},
	[light]: {
		boolean: oranges.base,
		char: lightCommonColor,
		className: lightCommonColor,
		comment: lightCommonColor,
		function: lightCommonColor,
		keyword: oranges.base,
		lineHighlight: lightCommonColor,
		method: lightCommonColor,
		number: oranges.base,
		operator: lightCommonColor,
		primitive: lightCommonColor,
		property: reds.base,
		punctuation: lightCommonColor,
		string: manipulateColor(greens.base, 10, shade),
		tag: lightCommonColor,
		variable: lightCommonColor
	}
}

const tokenStyles = {
	[dark]: {
		'& $boolean': { color: tokenColors[dark].boolean },
		'& $null': { color: tokenColors[dark].keyword },
		'& $number': { color: tokenColors[dark].number },
		'& $operator': { color: tokenColors[dark].operator },
		'& $property': {
			'&:hover': {
				borderBottom: `1px solid ${tokenColors[dark].property}`
			},
			color: tokenColors[dark].property
		},
		'& $punctuation': { color: tokenColors[light].punctuation },
		'& $string': { color: tokenColors[light].string }
	},
	[light]: {
		boolean: { color: tokenColors[light].boolean },
		null: { color: tokenColors[light].keyword },
		number: { color: tokenColors[light].number },
		operator: {
			color: tokenColors[light].operator,
			padding: { left: spacing.xs / 2, right: spacing.xs }
		},
		property: {
			'&:hover': {
				borderBottom: `1px solid ${tokenColors[light].property}`
			},
			color: tokenColors[light].property,
			cursor: 'pointer'
		},
		punctuation: {
			color: tokenColors[light].punctuation,
			padding: { left: spacing.xs / 2 }
		},
		string: { color: tokenColors[light].string }
	}
}

const palette = {
	[dark]: {
		background: blacks['darken-20']
	},
	[light]: {
		background: grays['lighten-70']
	}
}

const generateThemedContainerStyles = (themeType: ThemeType) => {
	const { background } = palette[themeType]
	const {
		base: { color }
	} = themedStyles[themeType]

	const {
		base: { borderColor }
	} = themedStyles[themeType]

	return {
		background,
		border: `1px solid ${borderColor}`,
		color
	}
}

const styles = {
	...tokenStyles[light],
	container: {
		'& ul, & ol': {
			'& li': {
				listStyle: 'none',
				margin: 0,
				padding: 0,
				whiteSpace: 'nowrap'
			},
			height: 'min-content',
			margin: 0,
			padding: 0,
			paddingLeft: spacing['m+'],
			whiteSpace: 'nowrap',
			width: 'min-content'
		},
		'&:hover': {
			'& $controls': { opacity: 1 }
		},
		...font.label,
		...generateThemedContainerStyles(light),
		fontFamily: 'Fira Code, monospace',
		fontWeight: fontWeight.light,
		height: '100%',
		padding: spacing.s,
		position: 'relative',
		width: '100%'
	},
	controls: { opacity: 0 },
	pickedItem: { backgroundColor: grays.base },
	wrapper: {
		height: '100%',
		overflow: 'auto',
		whiteSpace: 'nowrap',
		width: '100%'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			...tokenStyles[dark],
			'& $container': generateThemedContainerStyles(dark),
			'& $pickedItem': {
				backgroundColor: blacks['lighten-10']
			}
		}
	}
}

export const useStyles = createUseStyles(styles)

export type Classes = Record<keyof typeof styles, string>
