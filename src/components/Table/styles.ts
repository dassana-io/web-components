import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	colors: { blacks, grays, whites },
	flexDown,
	spacing
} = styleguide

const { dark, light } = ThemeType

const tablePalette = {
	[dark]: {
		sortArrow: {
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
		sortArrow: {
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

	const { sortArrow, th, tr } = tablePalette[themeType]

	return {
		...flexDown,
		'& .ant-table-wrapper': {
			'& .ant-table': {
				'& .ant-table-tbody > tr': {
					'&.ant-table-row': {
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
					cursor: 'default'
				},
				'& .ant-table-thead > tr': {
					'& > th': {
						'& > .ant-table-column-sorters': {
							'& > .ant-table-column-sorter': {
								'& .active': {
									color: sortArrow.active
								},
								color: sortArrow.base
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
				}
			}
		}
	}
}

export const useStyles = createUseStyles({
	searchBar: {
		alignSelf: props =>
			props.searchProps.placement === 'right' ? 'flex-end' : 'flex-start',
		marginBottom: spacing.m
	},
	tableContainer: generateTableStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark} $tableContainer`]: generateTableStyles(dark)
	}
})
