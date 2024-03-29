import { createUseStyles } from 'react-jss'
import random from 'lodash/random'
import { Skeleton } from '../Skeleton'
import { tablePalette } from './styles'
import times from 'lodash/times'
import { useTableContext } from './TableContext'
import { ColumnFormats, type ColumnType, ColumnTypes } from './types'
import React, { type FC, memo, useMemo } from 'react'
import { styleguide, themes, ThemeType } from 'components/assets/styles'

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
		background: tablePalette()[light].td.base.background,
		borderBottom: `1px solid ${themes[light].border}`,
		height: 54,
		padding: `0 ${spacing.m}px`
	},
	th: {
		'&:first-of-type': {
			paddingLeft: spacing.l
		},
		'&:last-of-type': {
			paddingRight: spacing.l
		},
		background: tablePalette()[light].th.base.background,
		height: 55,
		padding: `0 ${spacing.m}px`
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $table': {},
			'& $td': {
				background: tablePalette()[dark].td.base.background,
				borderBottom: `1px solid ${themes[dark].border}`
			},
			'& $th': {
				background: tablePalette()[dark].th.base.background
			}
		}
	}
})

// ------------------------------------

const THeaderCellSkeleton = memo(() => {
	const classes = useStyles()

	return (
		<th className={classes.th}>
			<Skeleton
				classes={[classes.skeleton]}
				height={15}
				width={`${random(25, 80)}%`}
			/>
		</th>
	)
})

THeaderCellSkeleton.displayName = 'THeaderCellSkeleton'

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

const TDataCellSkeleton: FC<TDataCellSkeletonProps> = memo(
	({ columns, index }: TDataCellSkeletonProps) => {
		const classes = useStyles()
		const initialWidth = useMemo(() => random(25, 100), [])

		let props = { width: initialWidth }

		if (columns.length > 0) {
			const format = columns[index].format
			const type = columns[index].type

			if (mappedSkeletonProps[type]) {
				props = mappedSkeletonProps[type]
			} else if (format && mappedSkeletonProps[format]) {
				props = mappedSkeletonProps[format]
			}
		}

		return (
			<td className={classes.td}>
				<Skeleton classes={[classes.skeleton]} height={15} {...props} />
			</td>
		)
	}
)

TDataCellSkeleton.displayName = 'TDataCellSkeleton'

// ------------------------------------

interface TableSkeletonProps {
	columns: ColumnType[]
	rowCount: number
}

export const TableSkeleton: FC<TableSkeletonProps> = memo(
	({ columns, rowCount }: TableSkeletonProps) => {
		const { isMobile } = useTableContext()

		const classes = useStyles()

		const columnCount = useMemo(
			() =>
				isMobile
					? 2
					: columns.length > 0
					? columns.length
					: random(3, 6),
			[columns.length, isMobile]
		)

		return (
			<table className={classes.table}>
				<thead>
					<tr>
						{times(columnCount, (j: number) => (
							<THeaderCellSkeleton key={j} />
						))}
					</tr>
				</thead>
				<tbody>
					{times(rowCount, (i: number) => (
						<tr key={i}>
							{times(columnCount, (j: number) => (
								<TDataCellSkeleton
									columns={columns}
									index={j}
									key={j}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		)
	}
)

TableSkeleton.displayName = 'TableSkeleton'
