import { isEmpty } from 'lodash'
import { v4 as uuidV4 } from 'uuid'
import {
	FilterCoordinators,
	FilterGroupConfig,
	FilterGroupMap,
	FilterMap,
	Filters
} from './types'

const { and, or } = FilterCoordinators

const defaultFilterGroup: FilterGroupConfig = {
	coordinator: and,
	filterIds: []
}

export const processFilters = (filterConfig: Filters) => {
	const { coordinator, filterGroups } = filterConfig

	const filterMap: FilterMap = {} as FilterMap
	const groupMap: FilterGroupMap = {} as FilterGroupMap

	filterGroups.forEach(filterGroup => {
		const id = uuidV4()
		const filterIds: string[] = []
		const subgroupIds: string[] = []
		const {
			coordinator: groupCoordinator = FilterCoordinators.and,
			filters = [],
			subgroups = []
		} = filterGroup

		filters.forEach(filter => {
			const filterId = uuidV4()

			filterIds.push(filterId)

			filterMap[filterId] = {
				...filter,
				groupId: id
			}
		})

		subgroups.forEach(subgroup => {
			const subgroupId = uuidV4()
			const subgroupFilterIds: string[] = []

			const {
				coordinator: subgroupCoordinator = FilterCoordinators.and,
				filters = []
			} = subgroup

			filters.forEach(filter => {
				const filterId = uuidV4()

				subgroupFilterIds.push(filterId)

				filterMap[filterId] = {
					...filter,
					groupId: subgroupId
				}
			})

			subgroupIds.push(subgroupId)

			groupMap[subgroupId] = {
				coordinator: subgroupCoordinator,
				filterIds: subgroupFilterIds,
				parentGroupId: id
			}
		})

		groupMap[id] = {
			coordinator: groupCoordinator,
			filterIds,
			subgroupIds
		}
	})

	if (isEmpty(groupMap)) {
		groupMap[uuidV4()] = defaultFilterGroup
	}

	return { filterMap, groupMap }
}
