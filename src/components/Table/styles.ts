import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	borderRadius,
	colors: { blacks, grays, whites },
	flexDown,
	font,
	spacing
} = styleguide

const { dark, light } = ThemeType

const paginationPalette = {
	[dark]: {
		disabledBgColor: blacks.base,
		hoverColor: blacks['lighten-80']
	},
	[light]: {
		disabledBgColor: grays.base,
		hoverColor: blacks['darken-20']
	}
}

export const generatePaginationStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, borderColor, color },
		disabled
	} = themedStyles[themeType]

	const { disabledBgColor, hoverColor } = paginationPalette[themeType]

	return {
		'& .ant-pagination.ant-table-pagination > li': {
			'&.ant-pagination-disabled, &.ant-pagination-disabled:hover': {
				'& button.ant-pagination-item-link': {
					backgroundColor: disabledBgColor,
					borderColor,
					color: disabled.color
				}
			},
			'&.ant-pagination-item, & button.ant-pagination-item-link': {
				'& a': { color },
				backgroundColor: backgroundColor,
				borderColor,
				borderRadius,
				color
			},
			'&.ant-pagination-item.ant-pagination-item-active, &.ant-pagination-item:hover, &:hover': {
				'& a': { color: hoverColor },
				'& button.ant-pagination-item-link': {
					borderColor: hoverColor,
					color: hoverColor
				},
				borderColor: hoverColor
			},
			borderRadius
		}
	}
}

const tablePalette = {
	[dark]: {
		arrow: {
			active: blacks['lighten-60'],
			base: blacks['lighten-30']
		},
		th: {
			base: {
				background: blacks['darken-20']
			},
			sort: {
				background: blacks['darken-40']
			}
		},
		tr: {
			active: {
				background: blacks['darken-40']
			},
			base: {
				background: blacks.base,
				border: blacks['darken-40']
			},
			hover: {
				background: blacks['darken-20']
			},
			sort: {
				background: blacks['darken-20']
			}
		}
	},
	[light]: {
		arrow: {
			active: blacks['lighten-30'],
			base: blacks['lighten-60']
		},
		th: {
			base: {
				background: grays['lighten-40']
			},
			sort: {
				background: grays.base
			}
		},
		tr: {
			active: {
				background: grays.base
			},
			base: {
				background: whites.base,
				border: grays.base
			},
			hover: {
				background: grays['lighten-40']
			},
			sort: {
				background: grays['lighten-40']
			}
		}
	}
}

const generateTableStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const { arrow, th, tr } = tablePalette[themeType]

	return {
		...flexDown,
		'& .ant-table-wrapper': {
			...generatePaginationStyles(themeType),
			'& .ant-table': {
				'& > .ant-table-container': {
					'& table': {
						'& .ant-table-thead > tr > th': {
							'& > .ant-table-column-sorters > .ant-table-column-sorter': {
								'& .active': {
									color: arrow.active
								},
								color: arrow.base
							},
							'&.ant-table-column-sort': {
								background: th.sort.background
							},
							background: th.base.background,
							borderBottom: 'none',
							borderRadius: 0,
							color,
							fontWeight: 400
						}
					},
					cursor: 'default'
				},
				background: tr.base.background
			}
		}
	}
}

const rowClasses = '&.ant-table-row.ant-table-row-level-0'
const cellClasses = '& > td'
const rowHoverCellClasses = '&:hover > td'

const generateThemedRowStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const { tr } = tablePalette[themeType]

	return {
		[cellClasses]: {
			'&.ant-table-column-sort': {
				background: tr.sort.background
			},
			background: tr.base.background,
			borderBottom: `1px solid ${tr.base.border}`,
			color
		},
		[rowHoverCellClasses]: {
			background: tr.hover.background
		}
	}
}

const generateThemedRowActionIconStyles = (
	themeType: ThemeType,
	active = false
) => {
	const { arrow } = tablePalette[themeType]

	return {
		color: active ? arrow.active : arrow.base
	}
}

const generateThemedActiveRowStyles = (themeType: ThemeType) => {
	const { tr } = tablePalette[themeType]

	return {
		background: tr.active.background
	}
}

interface Props {
	[prop: string]: any
}

const rowActionIconLightStyles = (isActive = false) => ({
	color: (props: Props) =>
		props.showRowActionIcon
			? generateThemedRowActionIconStyles(light, isActive).color
			: '',
	content: (props: Props) => (props.showRowActionIcon ? '"\u27e9"' : ''), // chevron
	fontSize: (props: Props) =>
		props.showRowActionIcon ? font.body.fontSize : 0,
	lineHeight: (props: Props) => (props.showRowActionIcon ? '14px' : 0),
	position: (props: Props) => (props.showRowActionIcon ? 'absolute' : 0),
	right: (props: Props) => (props.showRowActionIcon ? spacing.l : 0),
	top: (props: Props) => (props.showRowActionIcon ? 'calc(50% - 8px)' : 0)
})

export const useStyles = createUseStyles({
	activeRow: {},
	row: {
		[rowClasses]: {
			'&$activeRow': {
				[cellClasses]: {
					...generateThemedActiveRowStyles(light),
					'&:last-child::after': rowActionIconLightStyles(true)
				}
			},
			[cellClasses]: {
				...generateThemedRowStyles(light)[cellClasses],
				'&:last-child': {
					paddingRight: props =>
						props.showRowActionIcon ? 2 * spacing.l : spacing.m
				},
				cursor: props => (props.onRowClick ? 'pointer' : 'default'),
				fontWeight: 300
			},
			[rowHoverCellClasses]: {
				...generateThemedRowStyles(light)[rowHoverCellClasses],
				'&:last-child::after': rowActionIconLightStyles()
			}
		}
	},
	searchBar: {
		alignSelf: props =>
			props.searchProps.placement === 'right' ? 'flex-end' : 'flex-start',
		marginBottom: spacing.m
	},
	tableContainer: generateTableStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $row': {
				[rowClasses]: {
					'&$activeRow': {
						[cellClasses]: {
							...generateThemedActiveRowStyles(dark),
							'&:last-child::after': generateThemedRowActionIconStyles(
								dark,
								true
							)
						}
					},
					[cellClasses]: {
						...generateThemedRowStyles(dark)[cellClasses]
					},
					[rowHoverCellClasses]: {
						...generateThemedRowStyles(dark)[rowHoverCellClasses],
						'&:last-child::after': generateThemedRowActionIconStyles(
							dark
						)
					}
				}
			},
			'& $tableContainer': generateTableStyles(dark)
		}
	}
})
