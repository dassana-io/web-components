import { isEmpty, mapValues, omit } from 'lodash'
import { v4 as uuidV4 } from 'uuid'
import {
	FilterConfig,
	FilterCoordinators,
	FilterGroupConfig,
	FilterGroupMap,
	FilterMap,
	Filters,
	FilterUnit,
	Item
} from './types'

const { and, or } = FilterCoordinators

const defaultFilterGroup: FilterGroupConfig = {
	coordinator: and,
	items: []
}

export const processFilters = (filterConfig: Filters) => {
	const { coordinator, filterGroups } = filterConfig

	const filterMap: FilterMap = {} as FilterMap
	const groupMap: FilterGroupMap = {} as FilterGroupMap

	filterGroups.forEach(filterGroup => {
		const id = uuidV4()
		// const filterIds: string[] = []
		// const subgroupIds: string[] = []
		const items: Item[] = []

		const {
			coordinator: groupCoordinator = FilterCoordinators.and,
			filters = [],
			subgroups = []
		} = filterGroup

		filters.forEach(filter => {
			const filterId = uuidV4()

			items.push({ id: filterId })

			filterMap[filterId] = {
				...filter,
				groupId: id
			}
		})

		subgroups.forEach(subgroup => {
			const subgroupId = uuidV4()
			const subgroupFilterIds: Item[] = []

			const {
				coordinator: subgroupCoordinator = FilterCoordinators.and,
				filters = []
			} = subgroup

			filters.forEach(filter => {
				const filterId = uuidV4()

				subgroupFilterIds.push({ id: filterId })

				filterMap[filterId] = {
					...filter,
					groupId: subgroupId
				}
			})

			items.push({ id: subgroupId, subgroup: true })

			groupMap[subgroupId] = {
				coordinator: subgroupCoordinator,
				items: subgroupFilterIds,
				parentGroupId: id
			}
		})

		groupMap[id] = {
			coordinator: groupCoordinator,
			items
		}
	})

	if (isEmpty(groupMap)) {
		groupMap[uuidV4()] = defaultFilterGroup
	}

	return { filterMap, groupMap }
}

interface CategorizedItemIds {
	filterIds: string[]
	subgroupIds: string[]
}

export const getFiltersAndSubgroups = (items: Item[]): CategorizedItemIds => {
	const [subgroupIds, filterIds] = items.reduce<[string[], string[]]>(
		(result, item) => {
			const arrayIndex = item.subgroup ? 0 : 1

			result[arrayIndex].push(item.id)

			return result
		},
		[[], []]
	)

	return {
		filterIds,
		subgroupIds
	}
}

export const convertFilterConfigToFilterUnit = (
	config: FilterConfig
): FilterUnit =>
	mapValues(omit(config, 'groupId'), filter => filter.value.toLowerCase())
