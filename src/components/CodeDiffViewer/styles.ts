import { createUseStyles } from 'react-jss'
import { codePalette, tokenColors } from 'components/Code/utils'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType
const {
	colors: { blacks, grays, oranges, whites },
	spacing
} = styleguide

export const diffCmpStyles = {
	diffContainer: {
		pre: {
			fontFamily:
				'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
			fontSize: 12,
			lineHeight: '16px'
		}
	},
	variables: {
		dark: {
			addedBackground: 'rgba(46, 160, 67, 0.15)',
			addedGutterBackground: 'rgba(63, 185, 80, 0.3)',
			addedGutterColor: whites.base,
			diffViewerBackground: codePalette[dark].background,
			diffViewerColor: codePalette[dark].color,
			diffViewerTitleBackground: blacks.base,
			emptyLineBackground: codePalette[dark].background,
			gutterBackground: blacks.base,
			removedBackground: 'rgba(248, 81, 73, 0.15)',
			removedGutterBackground: 'rgba(248, 81, 73, 0.3)',
			removedGutterColor: whites.base,
			wordAddedBackground: 'rgba(46, 160, 67, 0.4)',
			wordRemovedBackground: 'rgba(248, 81, 73, 0.4)'
		},
		light: {
			diffViewerBackground: codePalette[light].background,
			diffViewerColor: codePalette[light].color,
			diffViewerTitleBackground: grays.base,
			emptyLineBackground: codePalette[light].background,
			gutterBackground: grays.base
		}
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
		'& .token.atrule': {
			background: 'none',
			color: oranges.base
		},
		background,
		color,
		wordBreak: 'break-word'
	}
}

export const useStyles = createUseStyles({
	container: {
		'&:hover': {
			'& $controls': { opacity: 1 }
		},
		position: 'relative'
	},
	controls: {
		opacity: 0,
		position: 'absolute',
		top: ({ hasTitle }) => (hasTitle ? 44 : spacing.s)
	},
	wrapper: {
		height: '100%',
		overflow: 'auto'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...generateThemedPreCodeStyles(light),
		[`.${dark}`]: generateThemedPreCodeStyles(dark)
	}
})
