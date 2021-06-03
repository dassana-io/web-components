import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const {
	borderRadius,
	colors: { blacks, grays },
	flexAlignCenter,
	font,
	fontWeight,
	spacing
} = styleguide

const { dark, light } = ThemeType

const filterPalette = {
	[dark]: {
		container: {
			background: blacks['darken-40'],
			borderColor: blacks['darken-40']
		}
	},
	[light]: {
		container: {
			background: grays['lighten-40'],
			borderColor: grays['lighten-40']
		}
	}
}

// --------------------------------------

const generateThemedFilterContainerStyles = (themeType: ThemeType) => {
	const {
		container: { background, borderColor }
	} = filterPalette[themeType]

	return { background, borderColor }
}

// --------------------------------------

export const useBaseFilterStyles = createUseStyles({
	container: {
		width: '100%'
	},
	filterControls: {
		...flexAlignCenter,
		paddingTop: spacing.s
	},
	filterIcon: {
		...font.label,
		marginRight: spacing.m
	},
	filtersSummary: {
		...font.label,
		color: themedStyles[light].base.color,
		cursor: 'pointer',
		fontStyle: 'italic',
		fontWeight: fontWeight.light
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $filtersSummary': {
				color: themedStyles[dark].base.color
			}
		}
	}
})

// --------------------------------------

export const useFilterUnitStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		...generateThemedFilterContainerStyles(light),
		border: '1px solid',
		borderRadius,
		margin: {
			bottom: spacing.s,
			right: spacing.s
		},
		padding: spacing.xs,
		paddingRight: spacing['s+']
	},
	multiSelectContainer: {
		paddingLeft: spacing['s+'],
		paddingRight: spacing['s+']
	},
	singleSelectContainer: {
		paddingRight: spacing['s+']
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateThemedFilterContainerStyles(dark)
		}
	}
})

// --------------------------------------

export const usePopoverStyles = createUseStyles({
	closeButton: {
		position: 'absolute',
		right: 13,
		top: 10
	},
	filtersList: {
		display: 'flex',
		flexWrap: 'wrap',
		paddingTop: spacing.m
	},
	popover: {
		position: 'relative',
		width: '100%'
	},
	popoverContent: {
		padding: spacing.l,
		paddingBottom: spacing.m,
		position: 'relative'
	},
	popoverControls: flexAlignCenter,
	popoverControlsChild: { marginRight: spacing.m },
	popoverTrigger: {
		position: 'absolute',
		top: spacing.xs / 2
	}
})
