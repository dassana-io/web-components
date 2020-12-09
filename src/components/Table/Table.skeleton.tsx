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

const mappedSkeletonProps: Record<string, any> = {
	[ColumnFormats.coloredDot]: { circle: true, width: 15 },
	[ColumnFormats.icon]: { width: 50 },
	[ColumnFormats.toggle]: { width: 50 },
	[ColumnTypes.number]: { width: 100 }
}

interface Props {
	columns: ColumnType[]
	rowCount: number
}

export const TableSkeleton: FC<Props> = ({ columns, rowCount }: Props) => {
	const classes = useStyles()

	return (
		<table className={classes.table}>
			<thead>
				<tr>
					{times(columns.length, (j: number) => {
						return (
							<th className={classes.th} key={j}>
								<Skeleton
									classes={[classes.skeleton]}
									height={15}
									width={`${random(20, 80)}%`}
								/>
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{times(rowCount, (i: number) => {
					return (
						<tr key={i}>
							{times(columns.length, (j: number) => {
								const format = columns[j].format
								const type = columns[j].type

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
									<td className={classes.td} key={j}>
										<Skeleton
											classes={[classes.skeleton]}
											height={15}
											{...props}
										/>
									</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
