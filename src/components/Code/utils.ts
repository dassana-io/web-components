import { createUseStyles } from 'react-jss'
import { isObject } from 'lodash'
import { ColorManipulationTypes, manipulateColor } from 'components/utils'
import {
	styleguide,
	themedStyles,
	themes,
	ThemeType
} from 'components/assets/styles'

const { dark, light } = ThemeType

const {
	colors: { blacks, blues, grays, greens, reds, oranges }
} = styleguide

interface CopyToClipboard {
	(str: string, callback?: () => void): void
}
export const copyToClipboard: CopyToClipboard = (str, callback) =>
	navigator.clipboard.writeText(str).then(callback)

const codePalette = {
	[dark]: {
		background: blacks['darken-20'],
		color: blacks['lighten-60']
	},
	[light]: {
		background: grays['lighten-70'],
		color: blacks['lighten-20']
	}
}

export type CodeType = string | Record<string, any>

export const stringifyCode = (code: CodeType): string =>
	isObject(code) ? JSON.stringify(code, null, '\t') : code

/* -x-x-x-x-x-x-x-x- Styles Related -x-x-x-x-x-x-x-x- */

const { font, fontWeight } = styleguide

export const commonCodeStyles = {
	...font.label,
	fontFamily: 'Fira Code, monospace',
	fontWeight: fontWeight.light
}

export const generateThemedCodeStyles = (themeType: ThemeType) => {
	const { background } = codePalette[themeType]
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

export const generateThemedControlsStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor }
	} = themedStyles[themeType]

	return {
		background: themes[themeType].background.secondary,
		border: `1px solid ${borderColor}`
	}
}

/* -------------- Prism Colors -------------- */

const darkCommonColor = themedStyles[dark].base.color
const lightCommonColor = themedStyles[light].base.color

const { shade } = ColorManipulationTypes

export const tokenColors = {
	[dark]: {
		boolean: reds.base,
		char: darkCommonColor,
		className: darkCommonColor,
		comment: blacks['lighten-40'],
		function: darkCommonColor,
		keyword: reds.base,
		lineHighlight: darkCommonColor,
		list: darkCommonColor,
		method: darkCommonColor,
		number: reds.base,
		operator: darkCommonColor,
		primitive: darkCommonColor,
		property: oranges.base,
		punctuation: darkCommonColor,
		string: manipulateColor(greens.base, 20, shade),
		tag: oranges.base,
		variable: darkCommonColor
	},
	[light]: {
		boolean: oranges.base,
		char: lightCommonColor,
		className: lightCommonColor,
		comment: blacks['lighten-40'],
		function: lightCommonColor,
		keyword: oranges.base,
		lineHighlight: lightCommonColor,
		list: lightCommonColor,
		method: lightCommonColor,
		number: oranges.base,
		operator: lightCommonColor,
		primitive: lightCommonColor,
		property: reds.base,
		punctuation: lightCommonColor,
		string: manipulateColor(greens.base, 10, shade),
		tag: reds.base,
		variable: lightCommonColor
	}
}

const aceColorsNormalizer = {
	boolean: 'boolean',
	comment: 'comment',
	keyword: 'keyword',
	list: 'list',
	number: 'numeric',
	property: 'variable',
	string: 'string',
	tag: 'tag'
}

/* ------------------------------------------ */

const generateThemedAceCodeStyles = (themeType: ThemeType) => {
	const { background, color } = codePalette[themeType]

	return {
		...Object.entries(aceColorsNormalizer).reduce((acc, [key, val]) => {
			return {
				...acc,
				[`& .ace_${val}`]: {
					background: 'none',
					color: tokenColors[themeType][
						key as keyof typeof tokenColors[ThemeType]
					]
				}
			}
		}, {}),
		background,
		color
	}
}

export const generateThemedLineNumStyles = (themeType: ThemeType) => {
	const { background } = codePalette[themeType]

	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	return {
		'& > span:before': {
			color
		},
		background,
		borderRight: `1px solid ${borderColor}`
	}
}

export const useStyles = createUseStyles({
	aceEditor: {
		'&.ace-tm': {
			'& .ace_gutter': {
				background: grays.base
			},
			'& .ace_indent-guide': {
				background:
					'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVSURBVHgBAQoA9f8A+fn5/wLb294AJR8GgZJTUkoAAAAASUVORK5CYII=) right repeat-y'
			},
			'& .ace_marker-layer .ace_bracket': {
				display: 'none'
			},
			...generateThemedAceCodeStyles(light)
		}
	},
	controls: { opacity: 0 },
	wrapper: {
		'&:hover': {
			'& $controls': { opacity: 1 }
		},
		height: '100%',
		overflow: 'auto',
		position: 'relative',
		width: 'max-content'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		'.ace_print-margin': { visibility: 'hidden !important' },
		[`.${dark}`]: {
			'& $aceEditor': {
				'&.ace-tm': {
					'& .ace_cursor': {
						color: blacks['lighten-60']
					},
					'& .ace_gutter': {
						background: blacks.base,
						color: blacks['lighten-60']
					},
					'& .ace_gutter-active-line': {
						background: blacks['lighten-10']
					},
					'& .ace_indent-guide': {
						background:
							'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVSURBVHgBAQoA9f8AICIq/wIzMzMACy8CB8kkVegAAAAASUVORK5CYII=) right repeat-y'
					},
					'& .ace_marker-layer .ace_active-line': {
						background: 'rgba(255,255,255,0.07)'
					},
					'& .ace_search': {
						'& .ace_button': {
							'&.checked': {
								borderColor: blues.base,
								color: blacks['lighten-80']
							},
							'&:hover': {
								background: blacks['lighten-20'],
								color: blacks['lighten-80']
							},
							borderColor: blacks['lighten-30'],
							color: grays.base
						},
						'& .ace_search_field': {
							'&::placeholder': {
								color: blacks['lighten-20']
							},
							background: blacks['darken-20'],
							borderColor: blacks['lighten-30'],
							color: blacks['lighten-70']
						},
						'& .ace_searchbtn': {
							'&:hover': { background: blacks['lighten-10'] },
							background: blacks['darken-20'],
							borderColor: blacks['lighten-30'],
							color: themedStyles[dark].base.color
						},
						background: blacks['lighten-10'],
						borderColor: blacks['lighten-30'],
						color: themedStyles[dark].base.color
					},
					...generateThemedAceCodeStyles(dark)
				}
			}
		}
	}
})
