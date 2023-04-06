import cloneDeep from 'lodash/cloneDeep'
import difference from 'lodash/difference'
import { FilterKeys } from '@dassana-io/web-utils'
import intersection from 'lodash/intersection'
import invert from 'lodash/invert'
import partition from 'lodash/partition'
import { styleguide } from '../assets/styles'
import uniq from 'lodash/uniq'

const {
	colors: { blues, oranges, purples, reds, yellows }
} = styleguide

export const GRID_ITEM_DIMENSION = 64
export const TOTAL_NUM_OF_PRIORITIES = 6

/* eslint-disable sort-keys*/
export const Rankings: Record<string, number> = {
	critical: 0,
	high: 1,
	medium: 2,
	low: 3
}
/* eslint-enable sort-keys*/

export const RankingsNumberMap: Record<number, string> = invert(Rankings)

export const CriticalityRankingListOrder = Object.keys(Rankings)
export const SeverityRankingListOrder = cloneDeep(
	CriticalityRankingListOrder
).reverse()

export const CriticalityRankingNumOrder = Object.values(Rankings)
export const SeverityRankingNumOrder = cloneDeep(
	CriticalityRankingNumOrder
).reverse()

export const PriorityColorMap: Record<number, string> = {
	0: purples.base,
	1: reds.base,
	2: oranges.base,
	3: yellows.base,
	4: blues.base,
	5: blues['lighten-50']
}

export const getPriorityColor = (num: number) =>
	num < Object.keys(PriorityColorMap).length
		? PriorityColorMap[num]
		: blues['lighten-50']

interface GridItemConfg {
	criticality: number
	severity: number
}

export type GridMap = Record<string, string[]>
export type FilterMap = Record<string, string[]>

interface PriorityGridConfig {
	grid: GridItemConfg[][]
	gridMap: GridMap
}

export const generatePriorityGrid = (): PriorityGridConfig => {
	const priorityGridItemMap: GridMap = Object.keys(PriorityColorMap).reduce(
		(acc, val) => {
			acc[`p${val}`] = []

			return acc
		},
		{} as GridMap
	)

	const grid = CriticalityRankingNumOrder.map(criticality =>
		SeverityRankingNumOrder.map(severity => {
			const rankingNum = criticality + severity
			const priority = `p${getPriorityFromRanking(rankingNum)}`

			const currPriorityGridItems = priorityGridItemMap[priority]

			priorityGridItemMap[priority] = [
				...currPriorityGridItems,
				`${RankingsNumberMap[criticality]}_${RankingsNumberMap[severity]}`
			]

			return {
				criticality: criticality as number,
				severity: severity as number
			}
		})
	)

	return { grid, gridMap: priorityGridItemMap }
}

export type PriorityCountData = Record<string, Record<string, number>>

const getPriorityFromRanking = (ranking: number) =>
	Math.min(ranking, TOTAL_NUM_OF_PRIORITIES - 1)

export const getPriorityItemCount = (
	severity: number,
	criticality: number,
	countData: PriorityCountData
): number =>
	countData?.[RankingsNumberMap[severity]]?.[
		RankingsNumberMap[criticality]
	] || 0

type RankingType = FilterKeys.criticality | FilterKeys.severity

// Get all grid items in criticality row or severity column
export const getRelatedRankingFilters = (
	axisRanking: string,
	type: RankingType
) =>
	CriticalityRankingListOrder.map(rank =>
		type === FilterKeys.criticality
			? `${axisRanking}_${rank}`
			: `${rank}_${axisRanking}`
	)

export const findCommonItemsInArrays = <T>(arr1: T[], arr2: T[]): T[] =>
	intersection(arr1, arr2)

export const allItemsInFirstArrExistInSecondArr = <T>(arr1: T[], arr2: T[]) =>
	findCommonItemsInArrays(arr1, arr2).length === arr1.length

export const removeItemsFromArray = <T>(
	arr: T[],
	itemsToRemove: T | T[]
): T[] =>
	arr.filter(item =>
		Array.isArray(itemsToRemove)
			? !itemsToRemove.includes(item)
			: item !== itemsToRemove
	)

// Update criticality / severity filters based on priority item click
// ex: Unselecting P1 will remove high and critical filters from criticality and severity if they are selected
const processRankingFiltersForSidebarItemClick = (
	type: RankingType,
	rankingFilters: string[],
	relatedRankingFilters: string[],
	filtersToOmit: string[]
) => {
	const rankingGridItemFiltersToAdd: string[] = []

	const [rankingFiltersToKeep, rankingFiltersToRemove] = partition<string>(
		rankingFilters,
		(rankingFilter: string) =>
			!relatedRankingFilters.includes(rankingFilter)
	)

	rankingFiltersToRemove.forEach(rankingFilter => {
		const relatedRankingFilters = getRelatedRankingFilters(
			rankingFilter,
			type
		)

		rankingGridItemFiltersToAdd.push(
			...difference<string>(relatedRankingFilters, filtersToOmit)
		)
	})

	return {
		rankingFiltersToKeep,
		rankingGridItemFiltersToAdd
	}
}

// From the grid items, get selected rankings for criticality / severity
export const getSelectedRankings = (
	type: RankingType,
	selectedFilters: string[],
	relatedRankingFilters: string[]
) => {
	const itemsToRemove: string[] = []
	const selectedRankings: string[] = []

	relatedRankingFilters.forEach(rankingFilter => {
		const rankingGridItems = getRelatedRankingFilters(rankingFilter, type)

		if (
			allItemsInFirstArrExistInSecondArr(
				rankingGridItems,
				selectedFilters
			)
		) {
			selectedRankings.push(rankingFilter)
			itemsToRemove.push(...rankingGridItems)
		}
	})

	return { itemsToRemove, selectedRankings }
}

const aggregateFilterKeys = [
	FilterKeys.criticality,
	FilterKeys.priority,
	FilterKeys.severity
]

export const convertAggregateFiltersToGridItems = (
	filters: FilterMap,
	gridMap: GridMap
): string[] => {
	const gridItemFilters: string[] = []

	aggregateFilterKeys.forEach(aggregateFilterKey => {
		const aggregateFilters = filters[aggregateFilterKey]

		switch (aggregateFilterKey) {
			case FilterKeys.priority: {
				aggregateFilters.forEach(priorityFilter => {
					const priorityGridItems = gridMap[priorityFilter]

					gridItemFilters.push(...priorityGridItems)
				})

				break
			}
			case FilterKeys.criticality:
			case FilterKeys.severity: {
				aggregateFilters.forEach(rankingFilter => {
					const rankingGridItems = getRelatedRankingFilters(
						rankingFilter,
						aggregateFilterKey
					)

					gridItemFilters.push(...rankingGridItems)
				})

				break
			}
		}
	})

	return uniq(gridItemFilters)
}

/**
 * Temporary fix until OR filters are supported
 * Bucket individual grid items under aggregate filters
 * Use aggregate filters if everything can be bucketed under one type
 * Otherwise use individual grid items filters
 */
const buildFiltersFromGridItems = (
	gridItemFilters: string[],
	gridMap: GridMap
): FilterMap => {
	const potentialNewFilters: FilterMap = {
		[FilterKeys.criticality]: [],
		[FilterKeys.priority]: [],
		[FilterKeys.severity]: [],
		[FilterKeys.criticality_severity]: [...gridItemFilters]
	}

	// Find priority filters
	const priorities = Object.keys(gridMap)
	const priorityFiltersToAdd: string[] = []
	let gridItemsToRemove: string[] = []

	priorities.forEach(priority => {
		const priorityGridItems = gridMap[priority]

		if (
			allItemsInFirstArrExistInSecondArr(
				priorityGridItems,
				gridItemFilters
			)
		) {
			priorityFiltersToAdd.push(priority)
			gridItemsToRemove.push(...priorityGridItems)
		}
	})

	// If all the grid items are part of priority filters, use priority filters instead of individual grid item filters
	if (
		allItemsInFirstArrExistInSecondArr(gridItemFilters, gridItemsToRemove)
	) {
		potentialNewFilters[FilterKeys.priority] = priorityFiltersToAdd
		potentialNewFilters[FilterKeys.criticality_severity] = []

		return potentialNewFilters
	}

	// Find criticality / severity filters
	gridItemsToRemove = []

	const criticalityFiltersToAdd: string[] = []
	const severityFiltersToAdd: string[] = []

	CriticalityRankingListOrder.forEach(ranking => {
		const [relatedCriticalityGridItems, relatedSeverityGridItems] = [
			getRelatedRankingFilters(ranking, FilterKeys.criticality),
			getRelatedRankingFilters(ranking, FilterKeys.severity)
		]

		if (
			allItemsInFirstArrExistInSecondArr(
				relatedCriticalityGridItems,
				gridItemFilters
			)
		) {
			criticalityFiltersToAdd.push(ranking)
			gridItemsToRemove.push(...relatedCriticalityGridItems)
		}

		if (
			allItemsInFirstArrExistInSecondArr(
				relatedSeverityGridItems,
				gridItemFilters
			)
		) {
			severityFiltersToAdd.push(ranking)
			gridItemsToRemove.push(...relatedSeverityGridItems)
		}
	})

	if (
		allItemsInFirstArrExistInSecondArr(gridItemFilters, gridItemsToRemove)
	) {
		// Since filters do not support OR, only add aggregate filters if there is only one type
		// Otherwise, everything needs to be left as individual grid item filters
		if (criticalityFiltersToAdd.length && !severityFiltersToAdd.length) {
			potentialNewFilters[FilterKeys.criticality] =
				criticalityFiltersToAdd
			potentialNewFilters[FilterKeys.criticality_severity] = []
		}

		if (severityFiltersToAdd.length && !criticalityFiltersToAdd.length) {
			potentialNewFilters[FilterKeys.severity] = severityFiltersToAdd
			potentialNewFilters[FilterKeys.criticality_severity] = []
		}
	}

	return potentialNewFilters
}

// Temporary filter processor until OR is supported
const processNewFilters = (newFilters: FilterMap, gridMap: GridMap) => {
	let processedFilters = newFilters

	const gridItemFilters = [
		...newFilters[FilterKeys.criticality_severity],
		...convertAggregateFiltersToGridItems(newFilters, gridMap)
	]

	processedFilters = buildFiltersFromGridItems(gridItemFilters, gridMap)

	return processedFilters
}

const allGridItemsInAggregateFilterSelected = (
	filterVal: string,
	aggregateFilters: string[],
	relatedAggregateFilters: string[],
	selectedGridItems: string[]
) =>
	aggregateFilters.includes(filterVal) ||
	allItemsInFirstArrExistInSecondArr(
		relatedAggregateFilters,
		selectedGridItems
	)

interface GridState {
	criticalityFilters: string[]
	gridItemFilters: string[]
	gridMap: GridMap
	priorityFilters: string[]
	selectedGridItems: string[]
	severityFilters: string[]
}

export const getNewFiltersFromSidebarItemClick = (
	priorityNum: number,
	gridState: GridState
) => {
	const {
		criticalityFilters,
		gridItemFilters,
		gridMap,
		priorityFilters,
		selectedGridItems,
		severityFilters
	} = gridState

	const newFilters: Record<string, string[]> = {}

	const priority = `p${priorityNum}`

	const priorityGridItemFilters = gridMap[priority]

	const relatedCriticalityFilters: string[] = []
	const relatedSeverityFilters: string[] = []

	priorityGridItemFilters.forEach(gridItemFilter => {
		const [criticality, severity] = gridItemFilter.split('_')

		relatedCriticalityFilters.push(criticality)
		relatedSeverityFilters.push(severity)
	})

	const isDeselection = allGridItemsInAggregateFilterSelected(
		priority,
		priorityFilters,
		priorityGridItemFilters,
		selectedGridItems
	)

	// Priority Filter Deselection
	if (isDeselection) {
		const gridItemFiltersToAdd: string[] = []
		const gridItemFiltersToExclude: string[] = []

		if (priorityFilters.length > 1) {
			priorityFilters.forEach(priorityFilter => {
				const priorityGridItems = gridMap[priorityFilter]

				if (priorityFilter !== priority)
					gridItemFiltersToExclude.push(...priorityGridItems)
			})
		}

		// Update criticality and severity filters that are affected with deselection of priority
		// For filters that are removed, add unaffected grid items part of row / column as individual filters
		if (criticalityFilters.length) {
			const { rankingGridItemFiltersToAdd, rankingFiltersToKeep } =
				processRankingFiltersForSidebarItemClick(
					FilterKeys.criticality,
					criticalityFilters,
					relatedCriticalityFilters,
					priorityGridItemFilters
				)

			gridItemFiltersToAdd.push(...rankingGridItemFiltersToAdd)
			newFilters[FilterKeys.criticality] = rankingFiltersToKeep
		}

		if (severityFilters.length) {
			const { rankingGridItemFiltersToAdd, rankingFiltersToKeep } =
				processRankingFiltersForSidebarItemClick(
					FilterKeys.severity,
					severityFilters,
					relatedSeverityFilters,
					priorityGridItemFilters
				)

			gridItemFiltersToAdd.push(...rankingGridItemFiltersToAdd)
			newFilters[FilterKeys.severity] = rankingFiltersToKeep
		}

		newFilters[FilterKeys.priority] = removeItemsFromArray(
			priorityFilters,
			priority
		)

		newFilters[FilterKeys.criticality_severity] = uniq([
			...removeItemsFromArray(gridItemFilters, priorityGridItemFilters),
			...removeItemsFromArray(
				gridItemFiltersToAdd,
				gridItemFiltersToExclude
			)
		])
	}
	// Priority Filter Selection
	else {
		const updatedGridItemFilters = [
			...selectedGridItems,
			...removeItemsFromArray(priorityGridItemFilters, gridItemFilters)
		]

		const gridItemsToRemove: string[] = []

		// Upon selection of priority, add applicable criticality / severity filters
		const {
			itemsToRemove: criticalityGridItemsToRemove,
			selectedRankings: selectedCriticalityFilters
		} = getSelectedRankings(
			FilterKeys.criticality,
			updatedGridItemFilters,
			relatedCriticalityFilters
		)

		const {
			itemsToRemove: severityGridItemsToRemove,
			selectedRankings: selectedSeverityFilters
		} = getSelectedRankings(
			FilterKeys.severity,
			updatedGridItemFilters,
			relatedSeverityFilters
		)

		gridItemsToRemove.push(
			...[...criticalityGridItemsToRemove, ...severityGridItemsToRemove]
		)

		newFilters[FilterKeys.criticality] = uniq([
			...criticalityFilters,
			...selectedCriticalityFilters
		])
		newFilters[FilterKeys.severity] = uniq([
			...severityFilters,
			...selectedSeverityFilters
		])

		newFilters[FilterKeys.priority] = uniq([...priorityFilters, priority])
		newFilters[FilterKeys.criticality_severity] = removeItemsFromArray(
			gridItemFilters,
			[...priorityGridItemFilters, ...gridItemsToRemove]
		)
	}

	// Remove filter processing when filters support OR
	const processedFilters = processNewFilters(
		{
			[FilterKeys.criticality]: criticalityFilters,
			[FilterKeys.priority]: priorityFilters,
			[FilterKeys.severity]: severityFilters,
			...newFilters
		},
		gridMap
	)

	return processedFilters
}

export const getNewFiltersFromAxisLabelClick = (
	type: RankingType,
	val: string,
	gridState: GridState
): FilterMap => {
	const {
		criticalityFilters,
		gridItemFilters,
		gridMap,
		priorityFilters,
		selectedGridItems,
		severityFilters
	} = gridState

	const primaryFilters =
		type === FilterKeys.criticality ? criticalityFilters : severityFilters

	const secondaryType =
		type === FilterKeys.criticality
			? FilterKeys.severity
			: FilterKeys.criticality
	const secondaryFilters =
		type === FilterKeys.criticality ? severityFilters : criticalityFilters

	const newFilters: FilterMap = {}

	const relatedTypeFilters = getRelatedRankingFilters(val, type)

	const isDeselection = allGridItemsInAggregateFilterSelected(
		val,
		primaryFilters,
		relatedTypeFilters,
		gridItemFilters
	)

	// Axis label deselection
	if (isDeselection) {
		const gridItemsFromPriority: string[] = []
		const gridItemsFromOtherPrimaryFilters: string[] = []
		const gridItemFiltersToAdd: string[] = []

		// Handle priority filter grid items affected by deselection of axis label
		if (priorityFilters.length) {
			const priorityFiltersToRemove: string[] = []

			priorityFilters.forEach(priorityFilter => {
				const priorityGridItems = gridMap[priorityFilter]

				if (
					findCommonItemsInArrays(
						priorityGridItems,
						relatedTypeFilters
					).length
				) {
					priorityFiltersToRemove.push(priorityFilter)

					gridItemFiltersToAdd.push(
						...difference<string>(
							priorityGridItems,
							relatedTypeFilters
						)
					)
				} else {
					gridItemsFromPriority.push(...priorityGridItems)
				}
			})

			newFilters[FilterKeys.priority] = removeItemsFromArray(
				priorityFilters,
				priorityFiltersToRemove
			)
		}

		// If there are other primary filters selected, keep track of those grid items so they
		// won't be unnecessarily added as individual grid item filters
		if (primaryFilters.length > 1) {
			primaryFilters.forEach(primaryFilter => {
				const primaryFilterGridItems = getRelatedRankingFilters(
					primaryFilter,
					type
				)

				gridItemsFromOtherPrimaryFilters.push(...primaryFilterGridItems)
			})
		}

		// Handle secondary filter grid items affected by deselection of axis label
		if (secondaryFilters.length) {
			const selectedGridItemsFromSecondaryFilter: string[] = []
			const relatedSecondaryFilters: string[] = []

			secondaryFilters.forEach(secondaryFilter => {
				const secondaryFilterGridItems = getRelatedRankingFilters(
					secondaryFilter,
					secondaryType
				)

				selectedGridItemsFromSecondaryFilter.push(
					...secondaryFilterGridItems
				)

				const sharedSecondaryFilterGridItems = findCommonItemsInArrays(
					secondaryFilterGridItems,
					relatedTypeFilters
				)

				if (sharedSecondaryFilterGridItems.length) {
					relatedSecondaryFilters.push(secondaryFilter)

					// Filter out shared grid items and add the remaining ones as individual grid items
					gridItemFiltersToAdd.push(
						...removeItemsFromArray<string>(
							secondaryFilterGridItems,
							sharedSecondaryFilterGridItems
						)
					)
				}
			})

			newFilters[secondaryType] = removeItemsFromArray(
				secondaryFilters,
				relatedSecondaryFilters
			)
		}

		newFilters[type] = removeItemsFromArray(primaryFilters, val)
		newFilters[FilterKeys.criticality_severity] = uniq([
			...removeItemsFromArray(gridItemFilters, relatedTypeFilters),
			...removeItemsFromArray(gridItemFiltersToAdd, [
				...gridItemsFromPriority,
				...gridItemsFromOtherPrimaryFilters
			])
		])
	}
	// Axis label selection
	else {
		const updatedSelectedGridItems = [
			...selectedGridItems,
			...removeItemsFromArray(relatedTypeFilters, selectedGridItems)
		]

		const priorityFiltersToAdd: string[] = []
		const gridItemFiltersToRemove = [...relatedTypeFilters]
		const secondaryFiltersToAdd: string[] = []

		// Add applicable priority filters
		Object.keys(gridMap).forEach(priority => {
			const priorityGridItems = gridMap[priority]

			if (
				allItemsInFirstArrExistInSecondArr(
					priorityGridItems,
					updatedSelectedGridItems
				)
			) {
				priorityFiltersToAdd.push(priority)
				gridItemFiltersToRemove.push(...priorityGridItems)
			}
		})

		if (priorityFiltersToAdd.length)
			newFilters[FilterKeys.priority] = uniq([
				...priorityFilters,
				...priorityFiltersToAdd
			])

		// Add appplicable secondary filters
		Object.keys(Rankings).forEach(secondaryFilter => {
			const secondaryFilterGridItems = getRelatedRankingFilters(
				secondaryFilter,
				secondaryType
			)

			if (
				allItemsInFirstArrExistInSecondArr(
					secondaryFilterGridItems,
					updatedSelectedGridItems
				)
			) {
				secondaryFiltersToAdd.push(secondaryFilter)
				gridItemFiltersToRemove.push(...secondaryFilterGridItems)
			}
		})

		if (secondaryFiltersToAdd.length) {
			newFilters[secondaryType] = uniq([
				...secondaryFilters,
				...secondaryFiltersToAdd
			])
		}

		newFilters[type] = [...primaryFilters, val]
		newFilters[FilterKeys.criticality_severity] = removeItemsFromArray(
			gridItemFilters,
			gridItemFiltersToRemove
		)
	}

	// Remove filter processing when filters support OR
	const processedFilters = processNewFilters(
		{
			[FilterKeys.criticality]: criticalityFilters,
			[FilterKeys.priority]: priorityFilters,
			[FilterKeys.severity]: severityFilters,
			...newFilters
		},
		gridMap
	)

	return processedFilters
}

const getGridItemsToOmit = (
	type: RankingType,
	rankingFilters: string[],
	filterListToOmitFrom: string[]
) => {
	const gridItemsToOmit: string[] = []

	rankingFilters.forEach(rankingFilter => {
		const gridItems = getRelatedRankingFilters(rankingFilter, type)

		const gridItemsToRemove = findCommonItemsInArrays(
			gridItems,
			filterListToOmitFrom
		)

		gridItemsToOmit.push(...gridItemsToRemove)
	})

	return gridItemsToOmit
}

export const getNewFiltersFromGridItemClick = (
	criticalityNum: number,
	severityNum: number,
	gridState: GridState
) => {
	const {
		criticalityFilters,
		gridItemFilters,
		gridMap,
		priorityFilters,
		selectedGridItems,
		severityFilters
	} = gridState

	const [criticality, severity] = [
		RankingsNumberMap[criticalityNum],
		RankingsNumberMap[severityNum]
	]
	const [relatedCriticalityGridItems, relatedSeverityGridItems] = [
		getRelatedRankingFilters(criticality, FilterKeys.criticality),
		getRelatedRankingFilters(severity, FilterKeys.severity)
	]

	const rankingNum = criticalityNum + severityNum
	const priority = `p${getPriorityFromRanking(rankingNum)}`
	const relatedPriorityGridItems = gridMap[priority]

	const gridItem = `${criticality}_${severity}`

	const newFilters: FilterMap = {}

	const gridItemsToAdd: string[] = []
	const gridItemsToRemove: string[] = []

	// Grid item deselection
	if (selectedGridItems.includes(gridItem)) {
		const remainingPriorityFilters = removeItemsFromArray(
			priorityFilters,
			priority
		)
		const remainingCriticalityFilters = removeItemsFromArray(
			criticalityFilters,
			criticality
		)
		const remainingSeverityFilters = removeItemsFromArray(
			severityFilters,
			severity
		)

		if (priorityFilters.includes(priority)) {
			const remainingPriorityGridItems = removeItemsFromArray(
				relatedPriorityGridItems,
				gridItem
			)

			newFilters[FilterKeys.priority] = removeItemsFromArray(
				priorityFilters,
				priority
			)

			gridItemsToRemove.push(gridItem)
			gridItemsToAdd.push(...remainingPriorityGridItems)
		}

		if (remainingPriorityFilters.length) {
			remainingPriorityFilters.forEach(priorityFilter => {
				const priorityGridItems = gridMap[priorityFilter]

				gridItemsToRemove.push(...priorityGridItems)
			})
		}

		if (criticalityFilters.includes(criticality)) {
			newFilters[FilterKeys.criticality] = removeItemsFromArray(
				criticalityFilters,
				criticality
			)

			gridItemsToAdd.push(
				...removeItemsFromArray(relatedCriticalityGridItems, gridItem)
			)
		}

		// Process remaining criticality filters and make sure related grid items aren't added as individual filters
		if (remainingCriticalityFilters.length) {
			const filtersToProcess = [
				...relatedSeverityGridItems,
				...gridItemsToAdd
			]

			const relatedCriticalityGridItemsToRemove = getGridItemsToOmit(
				FilterKeys.criticality,
				remainingCriticalityFilters,
				filtersToProcess
			)

			gridItemsToRemove.push(...relatedCriticalityGridItemsToRemove)
		}

		// Process remaining severity filters and make sure related grid items aren't added as individual filters
		if (remainingSeverityFilters.length) {
			const filtersToProcess = [
				...relatedCriticalityGridItems,
				...gridItemsToAdd
			]

			const relatedSeverityGridItemsToRemove = getGridItemsToOmit(
				FilterKeys.severity,
				remainingSeverityFilters,
				filtersToProcess
			)

			gridItemsToRemove.push(...relatedSeverityGridItemsToRemove)
		}

		if (severityFilters.includes(severity)) {
			newFilters[FilterKeys.severity] = removeItemsFromArray(
				severityFilters,
				severity
			)

			gridItemsToAdd.push(
				...removeItemsFromArray(relatedSeverityGridItems, gridItem)
			)
		}

		newFilters[FilterKeys.criticality_severity] = uniq([
			...removeItemsFromArray(gridItemFilters, gridItem),
			...removeItemsFromArray(gridItemsToAdd, gridItemsToRemove)
		])
	}
	// Grid item selection
	else {
		const selectedRelatedFilters = findCommonItemsInArrays(
			relatedPriorityGridItems,
			selectedGridItems
		)
		const selectedRelatedCriticalityFilters = findCommonItemsInArrays(
			relatedCriticalityGridItems,
			selectedGridItems
		)
		const selectedRelatedSeverityFilters = findCommonItemsInArrays(
			relatedSeverityGridItems,
			selectedGridItems
		)

		newFilters[FilterKeys.criticality_severity] = [
			...gridItemFilters,
			gridItem
		]

		// If added grid item will complete a priority filter, add priority filter
		// and remove relatedPriorityGridItems from individual filters
		if (
			selectedRelatedFilters.length ===
			relatedPriorityGridItems.length - 1
		) {
			newFilters[FilterKeys.priority] = [...priorityFilters, priority]
			newFilters[FilterKeys.criticality_severity] = removeItemsFromArray(
				gridItemFilters,
				relatedPriorityGridItems
			)
		}

		// If added grid item will complete a criticality filter, add criticality filter
		// and remove relatedCriticalityGridItems from individual filters
		if (
			selectedRelatedCriticalityFilters.length ===
			relatedCriticalityGridItems.length - 1
		) {
			newFilters[FilterKeys.criticality] = [
				...criticalityFilters,
				criticality
			]
			newFilters[FilterKeys.criticality_severity] = removeItemsFromArray(
				newFilters[FilterKeys.criticality_severity],
				relatedCriticalityGridItems
			)
		}

		// If added grid item will complete a severity filter, add severity filter
		// and remove relatedSeverityGridItems from individual filters
		if (
			selectedRelatedSeverityFilters.length ===
			relatedSeverityGridItems.length - 1
		) {
			newFilters[FilterKeys.severity] = [...severityFilters, severity]
			newFilters[FilterKeys.criticality_severity] = removeItemsFromArray(
				newFilters[FilterKeys.criticality_severity],
				relatedSeverityGridItems
			)
		}
	}

	// Remove filter processing when filters support OR
	const processedFilters = processNewFilters(
		{
			[FilterKeys.criticality]: criticalityFilters,
			[FilterKeys.priority]: priorityFilters,
			[FilterKeys.severity]: severityFilters,
			...newFilters
		},
		gridMap
	)

	return processedFilters
}
