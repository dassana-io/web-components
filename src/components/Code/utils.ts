import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays },
	spacing
} = styleguide

const generateThemedCodeStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	// overwriting prismjs default styles react example https://github.com/reactjs/reactjs.org/blob/master/src/prism-styles.js#L11
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
				[`& .token.${key}`]: { color: val }
			}),
			{}
		),
		color
	}
}

export const useStyles = createUseStyles({
	'@global': {
		// eslint-disable-next-line quotes
		"pre[class*='language-']": {
			'& .line-numbers-rows': {
				'& > span:before': generateThemedCodeStyles(light),
				background: grays['lighten-70'],
				borderRight: `1px solid ${grays.base}`
			},
			// eslint-disable-next-line quotes
			"& code[class*='language-']": {
				...generateThemedCodeStyles(light),
				background: grays['lighten-70'],
				fontFamily: 'Fira Code, monospace'
			},
			background: grays['lighten-70'],
			border: `1px solid ${grays.base}`,
			fontFamily: 'Fira Code, monospace',
			margin: 0
		}
	},
	search: {
		marginBottom: spacing.m
	}
})
