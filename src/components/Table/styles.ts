import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'

const { flexDown, spacing } = styleguide

export const useStyles = createUseStyles({
	searchBar: {
		alignSelf: props =>
			props.searchProps.placement === 'right' ? 'flex-end' : 'flex-start',
		marginBottom: spacing.m
	},
	tableContainer: {
		...flexDown,
		'& .ant-table-wrapper': {
			'& .ant-table': {
				'& .ant-table-tbody > tr': {
					'&.ant-table-row': {
						'& > td': {
							'&.ant-table-column-sort': {
								background: 'DarkSlateBlue'
							},
							background: 'MediumSlateBlue',
							borderBottom: '1px solid MediumOrchid',
							color: 'LemonChiffon',
							fontWeight: 300
						},
						'&:hover > td': {
							background: 'DarkSlateBlue'
						}
					},
					cursor: 'default'
				},
				'& .ant-table-thead > tr': {
					'& > th': {
						'& > .ant-table-column-sorters': {
							'& > .ant-table-column-sorter': {
								'& .active': {
									color: 'Navy'
								},
								color: 'DeepSkyBlue'
							}
						},
						'&.ant-table-column-sort': {
							background: 'BurlyWood'
						},
						background: 'wheat',
						borderBottom: 'none',
						borderRadius: 0,
						color: 'Orchid',
						fontWeight: 400
					}
				}
			}
		}
	}
})
