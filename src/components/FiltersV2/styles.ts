import { createUseStyles } from 'react-jss'
import {
	dropdownStyles,
	styleguide,
	themedStyles,
	ThemeType
} from '../assets/styles'

const { dark, light } = ThemeType
const {
	colors: { blacks, grays, whites },
	borderRadius,
	flexAlignCenter,
	flexDown,
	flexSpaceBetween,
	font,
	fontWeight,
	spacing
} = styleguide

const filterPalette = {
	[dark]: {
		container: {
			activeBorderColor: whites.base,
			borderColor: blacks['darken-40'],
			groupBackground: blacks['darken-10'],
			unitBackground: blacks['lighten-10']
		}
	},
	[light]: {
		container: {
			activeBorderColor: blacks.base,
			borderColor: grays['lighten-40'],
			groupBackground: grays['lighten-70'],
			unitBackground: grays['lighten-40']
		}
	}
}

export const useBaseFilterStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		'&:hover': {
			'& $iconButton': {
				opacity: 1
			}
		},
		background: filterPalette[light].container.unitBackground,
		borderRadius,
		color: themedStyles[light].base.color,
		fontWeight: fontWeight.light,
		padding: spacing.s,
		paddingLeft: spacing['m+'],
		width: 'fit-content'
	},
	dragHandle: {
		marginRight: spacing['s+']
	},
	iconButton: {
		'&:first-of-type': {
			marginLeft: spacing.l
		},
		marginLeft: spacing['s+'],
		opacity: 0
	},
	operator: {
		padding: {
			left: spacing.xs,
			right: spacing.xs
		}
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				background: filterPalette[dark].container.unitBackground,
				color: themedStyles[dark].base.color
			}
		}
	}
})

export const useFilterGroupStyles = createUseStyles({
	activeGroup: {},
	container: {
		'&$activeGroup': {
			border: `1px solid ${filterPalette[light].container.activeBorderColor}`
		},
		background: filterPalette[light].container.groupBackground,
		border: `1px solid ${themedStyles[light].base.borderColor}`,
		borderRadius,
		cursor: 'pointer',
		flexGrow: 1,
		padding: spacing['s+'],
		position: 'relative',
		width: 'fit-content'
	},
	coordinator: {
		paddingRight: spacing.m
	},
	delete: {
		background: filterPalette[light].container.groupBackground,
		position: 'absolute',
		right: '-6px',
		top: '50%',
		transform: 'translateY(-50%)'
	},
	filterContainer: {
		'&:not(:first-of-type)': {
			paddingTop: spacing['l+']
		},
		...flexSpaceBetween,
		position: 'relative'
	},
	hide: {
		opacity: 0,
		pointerEvents: 'none'
	},
	link: {
		...font.label,
		bottom: -spacing['l+'],
		position: 'absolute',
		right: 0
	},
	rendererContainer: {
		width: 'fit-content'
	},
	singleFilter: {
		'& $container': {
			borderColor: 'transparent',
			padding: 0
		},
		'& $link, $delete': {
			display: 'none'
		}
	},
	subgroup: {
		paddingTop: spacing.m
	},
	subgroupLink: {
		bottom: -spacing.m,
		zIndex: 2
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				'&$activeGroup': {
					border: `1px solid ${filterPalette[dark].container.activeBorderColor}`
				},
				background: filterPalette[dark].container.groupBackground,
				border: `1px solid ${themedStyles[dark].base.borderColor}`
			},
			'& $delete': {
				background: filterPalette[dark].container.groupBackground
			}
		}
	}
})

export const useSearchStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		paddingBottom: spacing.m
	},
	dropdownContainer: {
		position: 'absolute',
		top: 32,
		width: '100%',
		zIndex: 1
	},
	inputContainer: {
		...flexDown,
		position: 'relative'
	}
})

export const useDropdownStyles = createUseStyles({
	container: {
		...flexDown,
		background: filterPalette[light].container.groupBackground,
		border: `1px solid ${themedStyles[light].base.borderColor}`,
		borderRadius,
		color: themedStyles[light].base.color
	},
	dropdownItem: {
		'&:hover': {
			background: blacks['lighten-80']
		},
		cursor: 'pointer',
		padding: spacing['s+']
	},
	focus: {
		background: grays.base
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				background: filterPalette[dark].container.groupBackground,
				border: `1px solid ${themedStyles[dark].base.borderColor}`,
				color: themedStyles[dark].base.color
			},
			'& $dropdownItem': {
				'&:hover': {
					background: blacks['lighten-10']
				}
			}
		}
	}
})
