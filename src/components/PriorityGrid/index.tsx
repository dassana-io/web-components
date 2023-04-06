import { createUseStyles } from 'react-jss'
import { FilterKeys } from '@dassana-io/web-utils'
import { PriorityGridAxis } from './PriorityGridAxis'
import { PriorityGridAxisLabel } from './PriorityGridAxisLabel'
import { PriorityItem } from './PriorityItem'
import { PrioritySidebar } from './PrioritySidebar'
import { styleguide } from '../assets/styles'
import {
	convertAggregateFiltersToGridItems,
	generatePriorityGrid,
	getNewFiltersFromAxisLabelClick,
	getNewFiltersFromGridItemClick,
	getNewFiltersFromSidebarItemClick,
	getPriorityItemCount,
	GRID_ITEM_DIMENSION,
	PriorityCountData,
	RankingsNumberMap
} from './utils'
import React, { FC, useCallback, useMemo } from 'react'

const { grid: gridItems, gridMap } = generatePriorityGrid()

const { flexAlignCenter, flexDown, flexJustifyCenter, spacing } = styleguide

const useStyles = createUseStyles({
	grid: {
		...flexDown,
		transform: 'translateY(6px) rotate(-45deg)'
	},
	gridContainer: {
		...flexJustifyCenter,
		paddingTop: spacing.m
	},
	gridRow: {
		...flexAlignCenter
	},
	gridWithXAxis: {
		display: 'flex'
	},
	gridWithYAxis: {
		...flexDown,
		...flexJustifyCenter,
		...flexAlignCenter
	},
	xAxis: {
		paddingLeft: GRID_ITEM_DIMENSION
	}
})

interface PriorityGridProps {
	criticalityFilters: string[]
	countData?: PriorityCountData
	disableGridItemClick?: boolean
	gridItemFilters: string[]
	handleItemClick: (newFilters: Record<string, string[]>) => void
	priorityFilters: string[]
	severityFilters: string[]
}

export const PriorityGrid: FC<PriorityGridProps> = ({
	criticalityFilters,
	countData,
	disableGridItemClick = false,
	gridItemFilters,
	handleItemClick,
	priorityFilters,
	severityFilters
}: PriorityGridProps) => {
	const hasSomeFilters = useMemo(
		() =>
			[
				criticalityFilters,
				gridItemFilters,
				priorityFilters,
				severityFilters
			].some(filters => filters.length),
		[criticalityFilters, gridItemFilters, priorityFilters, severityFilters]
	)

	const selectedGridItems = useMemo(
		() => [
			...convertAggregateFiltersToGridItems(
				{
					[FilterKeys.criticality]: criticalityFilters,
					[FilterKeys.priority]: priorityFilters,
					[FilterKeys.severity]: severityFilters
				},
				gridMap
			),
			...gridItemFilters
		],
		[criticalityFilters, gridItemFilters, priorityFilters, severityFilters]
	)

	const classes = useStyles()

	const handlePrioritySidebarItemClick = useCallback(
		(priorityNum: number) => {
			const newFilters = getNewFiltersFromSidebarItemClick(priorityNum, {
				criticalityFilters,
				gridItemFilters,
				gridMap,
				priorityFilters,
				selectedGridItems,
				severityFilters
			})

			handleItemClick(newFilters)
		},
		[
			criticalityFilters,
			gridItemFilters,
			priorityFilters,
			selectedGridItems,
			severityFilters,
			handleItemClick
		]
	)

	const handlePriorityItemClick = useCallback(
		(criticalityNum: number, severityNum: number) => {
			const newFilters = getNewFiltersFromGridItemClick(
				criticalityNum,
				severityNum,
				{
					criticalityFilters,
					gridItemFilters,
					gridMap,
					priorityFilters,
					selectedGridItems,
					severityFilters
				}
			)

			handleItemClick(newFilters)
		},
		[
			criticalityFilters,
			gridItemFilters,
			handleItemClick,
			priorityFilters,
			selectedGridItems,
			severityFilters
		]
	)

	const handleCriticalityLabelAxisClick = useCallback(
		(criticality: string) => {
			const newFilters = getNewFiltersFromAxisLabelClick(
				FilterKeys.criticality,
				criticality,
				{
					criticalityFilters,
					gridItemFilters,
					gridMap,
					priorityFilters,
					selectedGridItems,
					severityFilters
				}
			)

			handleItemClick(newFilters)
		},
		[
			criticalityFilters,
			gridItemFilters,
			handleItemClick,
			priorityFilters,
			selectedGridItems,
			severityFilters
		]
	)

	const handleSeverityLabelAxisClick = useCallback(
		(severity: string) => {
			const newFilters = getNewFiltersFromAxisLabelClick(
				FilterKeys.severity,
				severity,
				{
					criticalityFilters,
					gridItemFilters,
					gridMap,
					priorityFilters,
					selectedGridItems,
					severityFilters
				}
			)

			handleItemClick(newFilters)
		},
		[
			criticalityFilters,
			gridItemFilters,
			handleItemClick,
			priorityFilters,
			selectedGridItems,
			severityFilters
		]
	)

	return (
		<div className={classes.gridContainer}>
			<div className={classes.grid}>
				<div className={classes.gridWithYAxis}>
					<PriorityGridAxis
						direction='horizontal'
						onRankingLabelClick={handleCriticalityLabelAxisClick}
						reverse
						selectedGridItems={selectedGridItems}
					/>
					<div className={classes.gridWithXAxis}>
						<PriorityGridAxisLabel
							label='Asset Criticality'
							rotate
						/>
						<div>
							{gridItems.map((gridRow, i) => (
								<div
									className={classes.gridRow}
									key={`priority-row-${i}`}
								>
									{gridRow.map(
										({ criticality, severity }, j) => (
											<PriorityItem
												allSelected={!hasSomeFilters}
												count={
													countData
														? getPriorityItemCount(
																severity,
																criticality,
																countData
														  ) // eslint-disable-line no-mixed-spaces-and-tabs
														: undefined
												}
												criticality={criticality}
												key={`priority-item-${i}-${j}`}
												onClick={
													disableGridItemClick
														? undefined
														: handlePriorityItemClick
												}
												selected={selectedGridItems.includes(
													`${RankingsNumberMap[criticality]}_${RankingsNumberMap[severity]}`
												)}
												severity={severity}
											/>
										)
									)}
								</div>
							))}
						</div>
						<PriorityGridAxis
							direction='vertical'
							onRankingLabelClick={handleSeverityLabelAxisClick}
							selectedGridItems={selectedGridItems}
						/>
					</div>
					<PriorityGridAxisLabel label='Finding Severity' />
				</div>
			</div>
			<PrioritySidebar
				allSelected={!hasSomeFilters}
				gridMap={gridMap}
				onSidebarItemClick={handlePrioritySidebarItemClick}
				selectedGridItems={selectedGridItems}
			/>
		</div>
	)
}
