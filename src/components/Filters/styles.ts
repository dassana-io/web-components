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
			background: grays.base,
			borderColor: grays.base
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
	bracket: { ...font.body, fontStyle: 'normal' },
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
	filterReadOnly: {
		'&:not(:last-of-type)::after': {
			content: "'+'", // eslint-disable-line quotes
			padding: {
				left: spacing.xs,
				right: spacing.xs
			}
		}
	},
	filterUnitReadOnly: {
		padding: {
			left: spacing.xs,
			right: spacing.xs
		}
	},
	filtersSummary: {
		...font.label,
		color: themedStyles[light].base.color,
		cursor: 'pointer',
		fontStyle: 'italic',
		fontWeight: fontWeight.light
	},
	operator: {
		padding: {
			left: spacing.xs,
			right: spacing.xs
		}
	},
	valuesReadOnly: {
		'&:not(:last-of-type)::after': {
			content: "','", // eslint-disable-line quotes
			paddingRight: spacing.xs
		}
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
		width: `calc(100% - ${2 * spacing.l}px)`
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
