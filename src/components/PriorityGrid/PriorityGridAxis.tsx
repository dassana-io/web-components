import capitalize from 'lodash/capitalize'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FilterKeys } from '@dassana-io/web-utils'
import {
	allItemsInFirstArrExistInSecondArr,
	CriticalityRankingListOrder,
	getRelatedRankingFilters,
	GRID_ITEM_DIMENSION,
	SeverityRankingListOrder
} from './utils'
import { colorPalette, styleguide, ThemeType } from '../assets/styles'
import React, { FC } from 'react'

const { dark, light } = ThemeType

const { borderRadius, flexCenter, flexDown, font, fontWeight, spacing } =
	styleguide

type Direction = 'horizontal' | 'vertical'

const useStyles = createUseStyles({
	axisItem: {
		...flexCenter,
		cursor: 'pointer',
		height: GRID_ITEM_DIMENSION,
		width: GRID_ITEM_DIMENSION * 0.625,
		writingMode: 'vertical-rl'
	},
	axisItemSelected: {
		background: colorPalette[light].popoverBackground,
		borderRadius,
		padding: spacing.s
	},
	horizontal: {
		'& $axisItem': {
			height: GRID_ITEM_DIMENSION * 0.625,
			width: GRID_ITEM_DIMENSION,
			writingMode: 'horizontal-tb'
		},
		'& $rankingLabels': {
			flexDirection: 'row'
		},
		'&$priorityGridAxis': {
			flexDirection: 'column',
			paddingRight: spacing.m
		}
	},
	priorityGridAxis: {
		display: 'flex',
		flexDirection: 'row-reverse',
		fontWeight: fontWeight.light
	},
	rankingLabels: {
		...font.label,
		...flexDown
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $axisItemSelected': {
				background: colorPalette[dark].popoverBackground
			}
		}
	}
})

interface PriorityGridAxisProps {
	direction: Direction
	onRankingLabelClick: (ranking: string) => void
	reverse?: boolean
	selectedGridItems: string[]
}

export const PriorityGridAxis: FC<PriorityGridAxisProps> = ({
	direction,
	onRankingLabelClick,
	reverse = false,
	selectedGridItems
}: PriorityGridAxisProps) => {
	const rankingOrder = reverse
		? SeverityRankingListOrder
		: CriticalityRankingListOrder

	const classes = useStyles()

	const containerClasses = cn({
		[classes.horizontal]: direction === 'horizontal',
		[classes.priorityGridAxis]: true
	})

	return (
		<div className={containerClasses}>
			<div className={classes.rankingLabels}>
				{rankingOrder.map(ranking => (
					<div
						className={classes.axisItem}
						key={ranking}
						onClick={() => onRankingLabelClick(ranking)}
					>
						<span
							className={cn({
								[classes.axisItemSelected]:
									allItemsInFirstArrExistInSecondArr(
										getRelatedRankingFilters(
											ranking,
											reverse
												? FilterKeys.severity
												: FilterKeys.criticality
										),
										selectedGridItems
									)
							})}
						>
							{capitalize(ranking)}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
