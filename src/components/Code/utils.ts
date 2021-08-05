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
	colors: { blacks, grays, greens, reds, oranges }
} = styleguide

interface CopyToClipboard {
	(str: string, callback?: () => void): void
}
export const copyToClipboard: CopyToClipboard = (str, callback) =>
	navigator.clipboard.writeText(str).then(callback)

const codePalette = {
	[dark]: {
		background: blacks['darken-20']
	},
	[light]: {
		background: grays['lighten-70']
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

/* ------------------------------------------ */

const generateThemedPreCodeStyles = (themeType: ThemeType) => {
	const { background } = codePalette[themeType]

	const {
		base: { color }
	} = themedStyles[themeType]

	return {
		...Object.entries(tokenColors[themeType]).reduce(
			(acc, [key, val]) => ({
				...acc,
				[`& .token.${key}`]: {
					background: 'none',
					color: val
				}
			}),
			{}
		),
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

/* eslint-disable quotes */
const codeSelector = "& code[class*='language-']"
const preCodeSelector = "pre[class*='language-']"
/* eslint-enable quotes */

export const useStyles = createUseStyles({
	controls: { opacity: 0 },
	// eslint-disable-next-line sort-keys
	'@global': {
		'.ace_print-margin': { visibility: 'hidden !important' },
		[preCodeSelector]: {
			'& .line-numbers-rows': {
				...generateThemedLineNumStyles(light),
				textShadow: 'none'
			},
			[codeSelector]: {
				...commonCodeStyles,
				...generateThemedPreCodeStyles(light),
				tabSize: 3,
				textShadow: 'none'
			},
			...commonCodeStyles,
			...generateThemedCodeStyles(light),
			margin: 0
		},
		[`.${dark}`]: {
			[`& ${preCodeSelector}`]: {
				'& .line-numbers-rows': generateThemedLineNumStyles(dark),
				[codeSelector]: generateThemedPreCodeStyles(dark),
				...generateThemedCodeStyles(dark)
			}
		}
	},
	wrapper: {
		'&:hover': {
			'& $controls': { opacity: 1 }
		},
		height: '100%',
		overflow: 'auto',
		position: 'relative',
		width: 'max-content'
	}
})
