import { createUseStyles } from 'react-jss'
import random from 'lodash/random'
import { Skeleton } from '../Skeleton'
import { tablePalette } from './styles'
import times from 'lodash/times'
import { ColumnFormats, ColumnType, ColumnTypes } from './types'
import React, { FC } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { spacing } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	skeleton: {
		maxWidth: 300
	},
	table: {
		borderCollapse: 'separate',
		borderSpacing: 0,
		tableLayout: 'fixed',
		textAlign: 'left',
		width: '100%'
	},
	td: {
		'&:first-of-type': {
			paddingLeft: spacing.l
		},
		'&:last-of-type': {
			paddingRight: spacing.l
		},
		background: tablePalette[light].td.base.background,
		borderBottom: `1px solid ${tablePalette[light].td.base.border}`,
		height: 64,
		padding: `0 ${spacing.m}px`
	},
	th: {
		'&:first-of-type': {
			paddingLeft: spacing.l
		},
		'&:last-of-type': {
			paddingRight: spacing.l
		},
		background: tablePalette[light].th.base.background,
		height: 54,
		padding: `0 ${spacing.m}px`
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $table': {},
			'& $td': {
				background: tablePalette[dark].td.base.background,
				borderBottom: `1px solid ${tablePalette[dark].td.base.border}`
			},
			'& $th': {
				background: tablePalette[dark].th.base.background
			}
		}
	}
})

// ------------------------------------

const THeaderCellSkeleton = () => {
	const classes = useStyles()

	return (
		<th className={classes.th}>
			<Skeleton
				classes={[classes.skeleton]}
				height={15}
				width={`${random(20, 80)}%`}
			/>
		</th>
	)
}

// ------------------------------------

const mappedSkeletonProps: Record<string, any> = {
	[ColumnFormats.coloredDot]: { circle: true, width: 15 },
	[ColumnFormats.icon]: { width: 50 },
	[ColumnFormats.toggle]: { width: 50 },
	[ColumnTypes.number]: { width: 100 }
}

interface TDataCellSkeletonProps extends Pick<TableSkeletonProps, 'columns'> {
	index: number
}

const TDataCellSkeleton: FC<TDataCellSkeletonProps> = ({
	columns,
	index
}: TDataCellSkeletonProps) => {
	const classes = useStyles()

	const format = columns[index].format
	const type = columns[index].type

	let props = {}

	if (mappedSkeletonProps[type]) {
		props = mappedSkeletonProps[type]
	} else {
		props =
			format && mappedSkeletonProps[format]
				? mappedSkeletonProps[format]
				: { width: `${random(10, 100)}%` }
	}

	return (
		<td className={classes.td}>
			<Skeleton classes={[classes.skeleton]} height={15} {...props} />
		</td>
	)
}

// ------------------------------------

interface TableSkeletonProps {
	columns: ColumnType[]
	rowCount: number
}

export const TableSkeleton: FC<TableSkeletonProps> = ({
	columns,
	rowCount
}: TableSkeletonProps) => {
	const classes = useStyles()

	return (
		<table className={classes.table}>
			<thead>
				<tr>
					{times(columns.length, (j: number) => {
						return <THeaderCellSkeleton key={j} />
					})}
				</tr>
			</thead>
			<tbody>
				{times(rowCount, (i: number) => {
					return (
						<tr key={i}>
							{times(columns.length, (j: number) => (
								<TDataCellSkeleton
									columns={columns}
									index={j}
									key={j}
								/>
							))}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
