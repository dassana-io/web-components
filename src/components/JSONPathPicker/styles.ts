import { createUseStyles } from 'react-jss'
import { ColorManipulationTypes, manipulateColor } from 'components/utils'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const {
	colors: { greens, reds, oranges },
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
		keyword: darkCommonColor,
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
		keyword: lightCommonColor,
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
		'& $number': { color: tokenColors[dark].number },
		'& $operator': { color: tokenColors[dark].operator },
		'& $property': {
			'&:hover': {
				color: manipulateColor(tokenColors[dark].property, 10, shade)
			},
			color: tokenColors[dark].property
		},
		'& $punctuation': { color: tokenColors[light].punctuation },
		'& $string': { color: tokenColors[light].string }
	},
	[light]: {
		boolean: { color: tokenColors[light].boolean },
		null: {},
		number: { color: tokenColors[light].number },
		operator: {
			color: tokenColors[light].operator,
			padding: { left: spacing.xs / 2, right: spacing.xs }
		},
		property: {
			'&:hover': {
				color: manipulateColor(tokenColors[light].property, 10, shade),
				textDecoration: 'underline'
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

const styles = {
	...tokenStyles[light],
	container: {
		...font.label,
		color: themedStyles[light].base.color,
		fontFamily: 'Fira Code, monospace',
		fontWeight: fontWeight.light,
		// eslint-disable-next-line sort-keys
		'& ul, & ol': {
			'& li': {
				listStyle: 'none',
				margin: 0,
				padding: 0
			},
			'&$list': { paddingLeft: spacing.m },
			margin: 0,
			padding: 0
		}
	},
	list: {},
	pathPickerIcon: {
		background: oranges.base,
		cursor: 'pointer',
		display: 'inline-block',
		height: 10,
		marginRight: 10,
		width: 10
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			...tokenStyles[dark],
			'& $container': {
				color: themedStyles[dark].base.color
			}
		}
	}
}

export const useStyles = createUseStyles(styles)

export type Classes = Record<keyof typeof styles, string>
