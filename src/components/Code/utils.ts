import { createUseStyles } from 'react-jss'
import {
	styleguide,
	themedStyles,
	themes,
	ThemeType
} from 'components/assets/styles'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays },
	font,
	fontWeight,
	spacing
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

const generateThemedCodeStyles = (themeType: ThemeType) => {
	const { background } = codePalette[themeType]

	const {
		base: { borderColor }
	} = themedStyles[themeType]

	return {
		background,
		border: `1px solid ${borderColor}`
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

const generateThemedPreCodeStyles = (themeType: ThemeType) => {
	const { background } = codePalette[themeType]

	const {
		base: { color }
	} = themedStyles[themeType]

	const prismColors = {
		boolean: color,
		char: color,
		className: color,
		comment: color,
		function: color,
		keyword: color,
		lineHighlight: color,
		method: color,
		number: color,
		operator: color,
		primitive: color,
		property: color,
		punctuation: color,
		string: color,
		tag: color,
		variable: color
	}

	return {
		...Object.entries(prismColors).reduce(
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

const generateThemedLineNumStyles = (themeType: ThemeType) => {
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
	preCode: {
		'&:hover': {
			'& $controls': { opacity: 1 }
		},
		position: 'relative'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[preCodeSelector]: {
			'& .line-numbers-rows': {
				...generateThemedLineNumStyles(light),
				textShadow: 'none'
			},
			[codeSelector]: {
				...generateThemedPreCodeStyles(light),
				...font.label,
				fontFamily: 'Fira Code, monospace',
				fontWeight: fontWeight.light,
				textShadow: 'none'
			},
			...generateThemedCodeStyles(light),
			...font.label,
			fontFamily: 'Fira Code, monospace',
			fontWeight: fontWeight.light,
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
	search: {
		marginBottom: spacing.m
	}
})
