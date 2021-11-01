import { ConsoleSqlOutlined } from '@ant-design/icons'
import { AntDInputType } from 'components/Input'
import { omit } from 'lodash'
import { RefObject, useMemo, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import {
	FilterCoordinators,
	FilterGroupConfig,
	FilterGroupMap,
	FilterMap,
	FilterUnit
} from './types'

const { and, or } = FilterCoordinators

const defaultFilter: FilterUnit = {
	key: '',
	operator: '',
	value: ''
}

const defaultFilterGroup: FilterGroupConfig = {
	coordinator: or,
	filterIds: []
}

export interface FilterMethods {
	addFilterToGroup: (filter: FilterUnit) => void
	addFilterToNewSubgroup: (filterId: string, parentGroupId: string) => void
	addNewFilterGroup: () => void
	deleteFilter: (filterId: string) => void
	deleteGroup: (groupId: string) => void
	setCurrentGroup: (groupId: string) => void
	setCurrentFilter: (filterId: string) => void
	updateFilter: (
		filterId: string,
		updatedFilterInfo: Partial<FilterUnit>
	) => void
	updateGroupCoordinator: (groupId: string, coord: FilterCoordinators) => void
	updatePrimaryCoordinator: (coord: FilterCoordinators) => void
}

export interface FilterProperties {
	currentGroupId: string
	currentFilterId: string
	filtersMap: FilterMap
	numFilters: number
	groupMap: FilterGroupMap
	primaryCoordinator: FilterCoordinators
}

export type UseFiltersType = FilterMethods & FilterProperties

interface UseFiltersProps {
	filterMap?: FilterMap
	groupMap?: FilterGroupMap
}

export const useFilters = (
	{
		filterMap: initialFilterMap = {},
		groupMap: initialGroupMap = {
			[uuidV4()]: defaultFilterGroup
		}
	}: UseFiltersProps,
	inputRef: RefObject<AntDInputType>
): UseFiltersType => {
	const [currentGroupId, setCurrentGroupId] = useState<string>(
		Object.keys(initialGroupMap)[0]
	)
	const [currentFilter, setCurrentFilter] = useState<string>('')
	const [groupMap, setGroupMap] = useState<FilterGroupMap>(initialGroupMap)
	const [filtersMap, setFiltersMap] = useState<FilterMap>(initialFilterMap)
	const [primaryCoordinator, setPrimaryCoordinator] = useState(or)

	const numFilters = useMemo(
		() => Object.keys(filtersMap).length,
		[filtersMap]
	)

	const setCurrentGroup = (groupId: string) => {
		setCurrentGroupId(groupId)
		inputRef.current?.focus()
	}

	const addFilterToGroup = (filter: FilterUnit) => {
		const newFilterId = uuidV4()

		// Add filter to filterMap
		setFiltersMap(prevFiltersMap => ({
			...prevFiltersMap,
			[newFilterId]: {
				...filter,
				groupId: currentGroupId
			}
		}))

		// Update filterIds list in groupMap
		setGroupMap(prevGroupMap => {
			const prevGroup = prevGroupMap[currentGroupId]

			return {
				...prevGroupMap,
				[currentGroupId]: {
					...prevGroup,
					filterIds: [...prevGroup.filterIds, newFilterId]
				}
			}
		})
	}

	const addNewFilterGroup = () => {
		const newFilterGroupId = uuidV4()

		setGroupMap(prevGroupMap => ({
			...prevGroupMap,
			[newFilterGroupId]: defaultFilterGroup
		}))

		setCurrentGroup(newFilterGroupId)
		inputRef.current?.focus()
	}

	const addFilterToNewSubgroup = (
		filterId: string,
		parentGroupId: string
	) => {
		const newSubgroupId = uuidV4()

		setGroupMap(prevGroupMap => {
			const currentGroup = prevGroupMap[parentGroupId]
			const { subgroupIds = [] } = currentGroup

			return {
				...prevGroupMap,
				[newSubgroupId]: {
					coordinator: or,
					filterIds: [filterId],
					parentGroupId
				},
				[parentGroupId]: {
					...currentGroup,
					coordinator: and,
					filterIds: currentGroup.filterIds.filter(
						id => id !== filterId
					),
					subgroupIds: [newSubgroupId, ...subgroupIds]
				}
			}
		})

		setCurrentGroup(newSubgroupId)

		setFiltersMap(prevFiltersMap => {
			const currentFilter = filtersMap[filterId]

			return {
				...prevFiltersMap,
				[filterId]: {
					...currentFilter,
					groupId: newSubgroupId
				}
			}
		})
	}

	const moveFilterToNewGroup = (
		filterId: string,
		prevGroupId: string,
		newGroupId: string
	) => {
		// update groupId in filterMap
		// Remove filterId from prevGroupId in groupMap
		// Add filterId to newGroupId in groupMap
	}

	const updateGroupCoordinator = (
		groupId: string,
		coordinator: FilterCoordinators
	) =>
		setGroupMap(prevGroupMap => {
			const prevGroup = prevGroupMap[groupId]

			return {
				...prevGroupMap,
				[groupId]: {
					...prevGroup,
					coordinator
				}
			}
		})

	const updateFilter = (
		filterId: string,
		updatedFilterInfo: Partial<FilterUnit>
	) =>
		setFiltersMap(prevFiltersMap => {
			const prevFilter = prevFiltersMap[filterId]

			return {
				...prevFiltersMap,
				[filterId]: {
					...prevFilter,
					...updatedFilterInfo
				}
			}
		})

	const deleteFilter = (filterIdToDelete: string) => {
		const filterGroupId = filtersMap[filterIdToDelete].groupId

		if (filterGroupId) {
			setGroupMap(prevGroupMap => {
				const prevGroup = prevGroupMap[filterGroupId]
				const { filterIds, parentGroupId, subgroupIds = [] } = prevGroup

				// If there is only one filter left in the group and there are no subgroups:
				if (filterIds.length === 1 && parentGroupId) {
					// let newGroupMap = omit(
					// 	prevGroupMap,
					// 	filterGroupId
					// ) as FilterGroupMap

					// If filter is in a subgroup, also remove the group from list of subgroupsIds in parent group
					// if (parentGroupId) {
					// 	const parentGroup = newGroupMap[parentGroupId]

					// 	newGroupMap = {
					// 		...newGroupMap,
					// 		[parentGroupId]: {
					// 			...parentGroup,
					// 			subgroupIds: parentGroup.subgroupIds?.filter(
					// 				subgroupId => subgroupId !== filterGroupId
					// 			)
					// 		}
					// 	}
					// }
					const parentGroup = prevGroupMap[parentGroupId]

					if (currentGroupId === filterGroupId)
						setCurrentGroupId(parentGroupId)

					return {
						...omit(prevGroupMap, filterGroupId),
						[parentGroupId]: {
							...parentGroup,
							subgroupIds: parentGroup.subgroupIds?.filter(
								subgroupId => subgroupId !== filterGroupId
							)
						}
					}
				}

				// If there is only one filter left and there is only one subgroup:
				if (filterIds.length === 1 && subgroupIds.length === 1) {
					const subgroupId = subgroupIds[0]
					const subgroup = groupMap[subgroupId]

					if (currentGroupId === filterGroupId)
						setCurrentGroupId(subgroupId)

					// Delete filter group and convert subgroup to main group
					return {
						...omit(prevGroupMap, filterGroupId),
						[subgroupId]: {
							...omit(subgroup, 'parentGroupId')
						}
					}
				}

				return {
					...prevGroupMap,
					[filterGroupId]: {
						...prevGroup,
						filterIds: prevGroup.filterIds.filter(
							filterId => filterId !== filterIdToDelete
						)
					}
				}
			})
		}

		setFiltersMap(prevFiltersMap => omit(prevFiltersMap, filterIdToDelete))

		inputRef.current?.focus()
	}

	const deleteGroup = (groupIdToDelete: string) => {
		const {
			filterIds,
			parentGroupId,
			subgroupIds = []
		} = groupMap[groupIdToDelete]

		let filtersToDelete = filterIds
		let nextGroupId = parentGroupId

		if (!nextGroupId) {
			const currentGroupIds = Object.keys(groupMap)

			if (currentGroupIds.length > 1) {
				const mainGroupIds = currentGroupIds.filter(
					id => id !== groupIdToDelete && !groupMap[id].parentGroupId
				)

				nextGroupId = mainGroupIds[mainGroupIds.length - 1]
			} else {
				nextGroupId = uuidV4()
			}
		}

		// For groups with subgroups, delete filters of subgroups
		subgroupIds.forEach(subgroupId => {
			const { filterIds } = groupMap[subgroupId]

			filtersToDelete = filtersToDelete.concat(filterIds)
		})

		setFiltersMap(prevFiltersMap => omit(prevFiltersMap, filtersToDelete))
		setGroupMap(prevGroupMap => {
			let newGroupMap = omit(prevGroupMap, [
				groupIdToDelete,
				...subgroupIds
			]) as FilterGroupMap

			// If it is a subgroup, disassociate it from the parent group by removing the id
			// from subgroup ids
			if (parentGroupId) {
				const parentGroup = newGroupMap[parentGroupId]
				const { filterIds, subgroupIds = [] } = parentGroup

				if (filterIds.length === 0 && subgroupIds.length === 2) {
					const remainingSubgroupId = subgroupIds.filter(
						id => id !== groupIdToDelete
					)[0]

					const subgroupToConvert = omit(
						prevGroupMap[remainingSubgroupId],
						'parentGroupId'
					)

					newGroupMap = {
						...omit(newGroupMap, subgroupIds),
						[parentGroupId]: subgroupToConvert
					}

					setFiltersMap(prevFiltersMap => {
						newGroupMap[parentGroupId].filterIds.forEach(
							filterId =>
								(prevFiltersMap = {
									...prevFiltersMap,
									[filterId]: {
										...prevFiltersMap[filterId],
										groupId: parentGroupId
									}
								})
						)

						return prevFiltersMap
					})
				} else {
					newGroupMap = {
						...newGroupMap,
						[parentGroupId]: {
							...parentGroup,
							subgroupIds: parentGroup.subgroupIds?.filter(
								subgroupId => subgroupId !== groupIdToDelete
							)
						}
					}
				}
			}

			const newGroupIds = Object.keys(newGroupMap)

			if (newGroupIds.length === 0 && nextGroupId) {
				newGroupMap = {
					[nextGroupId]: defaultFilterGroup
				}
			}

			return newGroupMap
		})
		console.log(nextGroupId, 'next group id')
		if (nextGroupId) setCurrentGroup(nextGroupId)
		inputRef.current?.focus()
	}

	return {
		addFilterToGroup,
		addFilterToNewSubgroup,
		addNewFilterGroup,
		currentFilterId: currentFilter,
		currentGroupId,
		deleteFilter,
		deleteGroup,
		filtersMap,
		groupMap,
		numFilters,
		primaryCoordinator,
		setCurrentFilter,
		setCurrentGroup,
		updateFilter,
		updateGroupCoordinator,
		updatePrimaryCoordinator: setPrimaryCoordinator
	}
}
