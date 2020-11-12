import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	colors: { blacks, grays, whites },
	flexDown,
	font,
	spacing
} = styleguide

const { dark, light } = ThemeType

const tablePalette = {
	[dark]: {
		arrow: {
			active: blacks['lighten-60'],
			base: blacks['lighten-20']
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
			base: {
				background: blacks.base,
				border: blacks['darken-40']
			},
			hover: {
				background: blacks['darken-20']
			},
			selected: {
				background: blacks['darken-40']
			},
			sort: {
				background: blacks['darken-20']
			}
		}
	},
	[light]: {
		arrow: {
			active: blacks['lighten-20'],
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
			base: {
				background: whites.base,
				border: grays.base
			},
			hover: {
				background: grays['lighten-40']
			},
			selected: {
				background: grays.base
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
			'& .ant-table': {
				'& > .ant-table-container': {
					'& table': {
						'& .ant-table-thead > tr': {
							'& > th': {
								'& > .ant-table-column-sorters': {
									'& > .ant-table-column-sorter': {
										'& .active': {
											color: arrow.active
										},
										color: arrow.base
									}
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
						borderRadius: 0
					},
					borderRadius: 0,
					cursor: 'default'
				},
				background: tr.base.background,
				borderRadius: 0
			}
		}
	}
}

const generateThemedRowStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const { tr } = tablePalette[themeType]

	return {
		'&.ant-table-row.ant-table-row-level-0': {
			'& > td': {
				'&.ant-table-column-sort': {
					background: tr.sort.background
				},
				background: tr.base.background,
				borderBottom: `1px solid ${tr.base.border}`,
				color,
				fontWeight: 300
			},
			'&:hover > td': {
				background: tr.hover.background
			}
		},
		borderRadius: 0
	}
}

const generateThemedActiveRowStyles = (themeType: ThemeType) => {
	const { tr } = tablePalette[themeType]

	return {
		'&.ant-table-row.ant-table-row-level-0': {
			'& > td.ant-table-cell': {
				background: tr.selected.background
			}
		}
	}
}

const commonRowActionIconStyles = {
	content: '"\u27e9"', // chevron
	// content: '"\u276f"', // Heavy right-pointing angle quotation mark ornament
	// content: '"\u3009"', // Right angle bracket (korean)
	// content: '"\u003e"', // Greater than sign '>'
	// content: '"\uff1e"', // 	Fullwidth greater-than sign
	// content: '"\u2992"', // angle bracket with dot
	...font.h2,
	position: 'absolute',
	right: 20,
	top: 'calc(50% - 18px)'
}

const generateThemedRowActionIconStyles = (themeType: ThemeType) => {
	const { arrow } = tablePalette[themeType]

	return {
		color: arrow.active
	}
}

export const useStyles = createUseStyles({
	row: generateThemedRowStyles(light),
	rowActionIconActive: {
		'&.ant-table-row.ant-table-row-level-0': {
			'& > td.ant-table-cell': {
				'&:last-child::after': {
					...generateThemedRowActionIconStyles(light),
					...commonRowActionIconStyles
				}
			}
		}
	},
	rowActionIconHover: {
		'&.ant-table-row.ant-table-row-level-0': {
			'&:hover > td.ant-table-cell': {
				'&:last-child::after': {
					...generateThemedRowActionIconStyles(light),
					...commonRowActionIconStyles
				}
			}
		}
	},
	rowClickable: {
		'&.ant-table-row': {
			'& > td': {
				cursor: 'pointer'
			}
		}
	},
	rowWithActionIcon: {
		'&.ant-table-row': {
			'& > td:last-child': {
				paddingRight: 50
			}
		}
	},
	searchBar: {
		alignSelf: props =>
			props.searchProps.placement === 'right' ? 'flex-end' : 'flex-start',
		marginBottom: spacing.m
	},
	// eslint-disable-next-line sort-keys
	activeRow: generateThemedActiveRowStyles(light),
	tableContainer: generateTableStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark} `]: {
			'& $activeRow': generateThemedActiveRowStyles(dark),
			'& $row': generateThemedRowStyles(dark),
			'& $rowActionIconActive': {
				'&.ant-table-row.ant-table-row-level-0': {
					'& > td.ant-table-cell': {
						'&:last-child::after': {
							...generateThemedRowActionIconStyles(dark)
						}
					}
				}
			},
			'& $rowActionIconHover': {
				'&.ant-table-row.ant-table-row-level-0': {
					'&:hover > td.ant-table-cell': {
						'&:last-child::after': {
							...generateThemedRowActionIconStyles(dark)
						}
					}
				}
			},
			'& $tableContainer': generateTableStyles(dark)
		}
	}
})
