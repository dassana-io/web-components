import { Breakpoints } from '@dassana-io/web-utils'
import { createUseStyles } from 'react-jss'
import { mediaSelectorsWithBreakpoints } from 'components/utils'
import { popoverPalette } from '../Popover/utils'
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

const { mobile } = Breakpoints
const { max } = mediaSelectorsWithBreakpoints

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
		position: 'relative',
		width: '100%'
	},
	filterControls: flexAlignCenter,
	filterIcon: {
		[max[mobile]]: {
			marginRight: spacing.s
		},
		...font.label,
		background: themedStyles[light].base.backgroundColor,
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
			'& $filterIcon': {
				background: themedStyles[dark].base.backgroundColor
			},
			'& $filtersSummary': {
				color: themedStyles[dark].base.color
			}
		}
	}
})

// --------------------------------------

export const useFilterUnitStyles = createUseStyles({
	closeIcon: {
		[max[mobile]]: {
			position: 'absolute',
			right: spacing.s
		}
	},
	container: {
		[max[mobile]]: {
			alignItems: 'flex-start',
			flexDirection: 'column',
			marginRight: 0,
			padding: spacing.s,
			position: 'relative',
			width: '100%'
		},
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
		[max[mobile]]: {
			padding: 0
		},
		paddingLeft: spacing['s+'],
		paddingRight: spacing['s+']
	},
	operator: {
		[max[mobile]]: {
			marginBottom: spacing.xs
		}
	},
	singleSelectContainer: {
		[max[mobile]]: {
			marginBottom: spacing.xs,
			padding: 0
		},
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

const popoverControlsHeight = 48

export const usePopoverStyles = createUseStyles({
	closeButton: {
		position: 'absolute',
		right: 13,
		top: 10,
		zIndex: 100
	},
	filtersList: {
		[max[mobile]]: {
			display: 'block',
			height: `calc(100vh - ${popoverControlsHeight}px)`,
			overflow: 'auto',
			padding: spacing.m
		},
		display: 'flex',
		flexWrap: 'wrap',
		paddingTop: spacing.m
	},
	popover: {
		position: 'relative',
		width: '100%',
		zIndex: 10
	},
	popoverContent: {
		[max[mobile]]: {
			height: '100vh',
			padding: 0,
			width: '100vw'
		},
		padding: spacing.l,
		paddingBottom: spacing.m,
		position: 'relative'
	},
	popoverControls: {
		...flexAlignCenter,
		[max[mobile]]: {
			background: popoverPalette[light].background,
			height: popoverControlsHeight,
			padding: `${spacing.s}px ${spacing.m}px`,
			position: 'sticky',
			top: 0,
			zIndex: 10
		}
	},
	popoverControlsChild: { marginRight: spacing.m },
	popoverTrigger: {
		position: 'absolute',
		top: -spacing.m
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $popoverControls': {
				[max[mobile]]: {
					background: popoverPalette[dark].background
				}
			}
		}
	}
})
