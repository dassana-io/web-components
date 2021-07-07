import { createUseStyles } from 'react-jss'
import { TableProps } from '.'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	borderRadius,
	colors: { blacks, grays, whites },
	flexDown,
	font,
	spacing
} = styleguide

const { dark, light } = ThemeType

export const generatePaginationStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, borderColor, color },
		disabled,
		hover
	} = themedStyles[themeType]

	return {
		'& .ant-pagination.ant-table-pagination > li': {
			'& .ant-pagination-item-ellipsis': {
				color: disabled.color
			},
			'& .ant-pagination-item-link-icon': { color },
			'&.ant-pagination-disabled, &.ant-pagination-disabled:hover': {
				'& button.ant-pagination-item-link': {
					backgroundColor: disabled.backgroundColor,
					borderColor,
					color: disabled.color
				}
			},
			'&.ant-pagination-item, & button.ant-pagination-item-link': {
				'& a': { color },
				backgroundColor,
				borderColor,
				borderRadius,
				color
			},
			'&.ant-pagination-item.ant-pagination-item-active, &.ant-pagination-item:hover, &:hover': {
				'& a': { color: hover.color },
				'& button.ant-pagination-item-link': {
					borderColor: hover.borderColor,
					color: hover.color
				},
				borderColor: hover.borderColor
			},
			borderRadius
		}
	}
}

export const tablePalette = {
	[dark]: {
		arrow: {
			active: blacks['lighten-60'],
			base: blacks['lighten-30']
		},
		td: {
			active: {
				background: blacks['darken-40']
			},
			base: {
				background: blacks.base
			},
			hover: {
				background: blacks['darken-20']
			},
			sort: {
				background: blacks['darken-20']
			}
		},
		th: {
			base: {
				background: blacks['darken-40']
			},
			sort: {
				background: blacks['darken-40']
			}
		}
	},
	[light]: {
		arrow: {
			active: blacks['lighten-30'],
			base: blacks['lighten-60']
		},
		td: {
			active: {
				background: grays.base
			},
			base: {
				background: whites.base
			},
			hover: {
				background: grays['lighten-40']
			},
			sort: {
				background: grays['lighten-40']
			}
		},
		th: {
			base: {
				background: grays['lighten-40']
			},
			sort: {
				background: grays.base
			}
		}
	}
}

const generateTableStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const { arrow, td, th } = tablePalette[themeType]

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
				'&.ant-table-empty .ant-table-tbody > tr.ant-table-placeholder': {
					'& .ant-empty-image': {
						display: 'none'
					},
					'& .ant-table-cell': {
						borderBottom: 'none'
					},
					'& > .ant-table-cell': {
						background: td.base.background
					},
					color: td.base.background
				},
				background: td.base.background
			}
		}
	}
}

const cellClasses = '& > td'
const lastCellAfterClasses = '&:last-child::after'
const rowClasses = '&.ant-table-row.ant-table-row-level-0'
const rowHoverCellClasses = '&:hover > td'

const generateThemedCellStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	const { td } = tablePalette[themeType]

	return {
		[cellClasses]: {
			'&.ant-table-column-sort': {
				background: td.sort.background
			},
			background: td.base.background,
			borderBottom: `1px solid ${borderColor}`,
			color
		},
		[rowHoverCellClasses]: {
			background: td.hover.background
		}
	}
}

const generateThemedActiveCellStyles = (themeType: ThemeType) => {
	const { td } = tablePalette[themeType]

	return {
		background: td.active.background
	}
}

const generateThemedRowIconStyles = (themeType: ThemeType, active = false) => {
	const { arrow } = tablePalette[themeType]

	return {
		color: active ? arrow.active : arrow.base
	}
}

const generateLightRowIconStyles = (isActive = false) => ({
	...generateThemedRowIconStyles(light, isActive),
	content: (props: TableProps<{}>) => (props.onRowClick ? '"\u27e9"' : '""'),
	fontSize: font.body.fontSize,
	lineHeight: '12px',
	position: 'absolute',
	right: spacing.l,
	top: `calc(50% - ${font.body.fontSize / 2}px)`
})

export const useStyles = createUseStyles({
	activeRow: {},
	row: {
		[rowClasses]: {
			'&$activeRow': {
				[cellClasses]: {
					...generateThemedActiveCellStyles(light),
					[lastCellAfterClasses]: generateLightRowIconStyles(true)
				}
			},
			[cellClasses]: {
				...generateThemedCellStyles(light)[cellClasses],
				'&:last-child': {
					paddingRight: props =>
						props.onRowClick ? 2 * spacing.l : spacing.m
				},
				cursor: props => (props.onRowClick ? 'pointer' : 'default'),
				fontWeight: 300
			},
			[rowHoverCellClasses]: {
				...generateThemedCellStyles(light)[rowHoverCellClasses],
				[lastCellAfterClasses]: generateLightRowIconStyles()
			}
		}
	},
	tableContainer: generateTableStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $row': {
				[rowClasses]: {
					'&$activeRow': {
						[cellClasses]: {
							...generateThemedActiveCellStyles(dark),
							[lastCellAfterClasses]: generateThemedRowIconStyles(
								dark,
								true
							)
						}
					},
					[cellClasses]: {
						...generateThemedCellStyles(dark)[cellClasses]
					},
					[rowHoverCellClasses]: {
						...generateThemedCellStyles(dark)[rowHoverCellClasses],
						[lastCellAfterClasses]: generateThemedRowIconStyles(
							dark
						)
					}
				}
			},
			'& $tableContainer': generateTableStyles(dark)
		}
	},
	tableControls: {
		display: 'flex',
		justifyContent: props =>
			props.searchProps.placement === 'right' ? 'flex-end' : 'flex-start',
		marginBottom: spacing.m,
		width: '100%'
	}
})
