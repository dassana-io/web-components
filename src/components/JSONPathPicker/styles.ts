import { createUseStyles } from 'react-jss'
import { codePalette, tokenColors } from '../Code/utils'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const {
	colors: { blacks, grays },
	font,
	fontWeight,
	spacing
} = styleguide

const { light, dark } = ThemeType

const { dark: darkTokenClrs, light: lightTokenClrs } = tokenColors

const tokenStyles = {
	[dark]: {
		'& $boolean': { color: darkTokenClrs.boolean },
		'& $null': { color: darkTokenClrs.keyword },
		'& $number': { color: darkTokenClrs.number },
		'& $operator': { color: darkTokenClrs.operator },
		'& $property': {
			'&:hover': {
				borderBottom: `1px solid ${darkTokenClrs.property}`
			},
			color: darkTokenClrs.property
		},
		'& $punctuation': { color: darkTokenClrs.punctuation },
		'& $string': { color: darkTokenClrs.string }
	},
	[light]: {
		boolean: { color: lightTokenClrs.boolean },
		null: { color: lightTokenClrs.keyword },
		number: { color: lightTokenClrs.number },
		operator: {
			color: lightTokenClrs.operator,
			padding: { left: spacing.xs / 2, right: spacing.xs }
		},
		property: {
			'&:hover': {
				borderBottom: `1px solid ${lightTokenClrs.property}`
			},
			color: lightTokenClrs.property,
			cursor: 'pointer'
		},
		punctuation: {
			color: lightTokenClrs.punctuation,
			padding: { left: spacing.xs / 2 }
		},
		string: { color: lightTokenClrs.string }
	}
}

const generateThemedContainerStyles = (themeType: ThemeType) => {
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
