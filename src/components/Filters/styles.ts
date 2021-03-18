import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

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

export const useFilterStyles = createUseStyles({
	container: {
		width: '100%'
	},
	filterControls: {
		...flexAlignCenter,
		paddingTop: spacing.s
	},
	filterIcon: {
		...font.label,
		marginRight: spacing.l
	},
	selectedFiltersText: {
		...font.body,
		color: themedStyles[light].base.color,
		cursor: 'pointer',
		fontStyle: 'italic',
		fontWeight: fontWeight.light
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $selectedFiltersText': {
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
		marginBottom: spacing.s,
		marginRight: spacing.s,
		padding: `${spacing.xs}px ${spacing['s+']}px ${spacing.xs}px ${spacing.xs}px`
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
