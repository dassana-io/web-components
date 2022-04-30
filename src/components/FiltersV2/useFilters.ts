import { AntDInputType } from 'components/Input'
import { getFiltersAndSubgroups } from './utils'
import { omit } from 'lodash'
import { UniqueIdentifier } from '@dnd-kit/core'
import { unstable_batchedUpdates } from 'react-dom'
import { v4 as uuidV4 } from 'uuid'
import {
	FilterCoordinators,
	FilterGroupConfig,
	FilterGroupMap,
	FilterMap,
	FiltersMap
	// FilterUnit
} from './types'
import {
	findIndexOfChildItem,
	insertItemsAtIndex,
	removeChildItemsFromContainer
} from './FilterRenderer/utils'
import { MutableRefObject, RefObject, useMemo, useRef, useState } from 'react'

const { and, or } = FilterCoordinators

// const defaultFilter: FilterUnit = {
// 	key: '',
// 	operator: '',
// 	value: ''
// }

const defaultFilterGroup: FilterGroupConfig = {
	coordinator: and,
	items: []
}

export interface FilterMethods {
	addFilterToGroup: (filter: FiltersMap) => void
	addFilterToNewSubgroup: (filterId: string, parentGroupId: string) => void
	addNewFilterGroup: () => void
	deleteFilter: (filterId: string) => void
	deleteGroup: (groupId: string) => void
	setCurrentGroup: (groupId: string) => void
	setCurrentFilter: (filterId: string) => void
	setDraggingFilterId: React.Dispatch<React.SetStateAction<string | null>>
	setGroupMap: React.Dispatch<React.SetStateAction<FilterGroupMap>>
	updateFilter: (
		filterId: string,
		updatedFilterInfo: Partial<FiltersMap>
	) => void
	updateGroupCoordinator: (groupId: string, coord: FilterCoordinators) => void
	updatePrimaryCoordinator: (coord: FilterCoordinators) => void
}

export interface FilterProperties {
	currentGroupId: string
	currentFilterId: string
	draggingFilterId: string | null
	filtersMap: FilterMap
	numFilters: number
	groupMap: FilterGroupMap
	lastDragOverId: MutableRefObject<string | null>
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
	const [draggingFilterId, setDraggingFilterId] =
		useState<string | null>(null)
	const lastOverId = useRef<UniqueIdentifier | null>(null)
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

	const addFilterToGroup = (filter: FiltersMap) => {
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
					items: [...prevGroup.items, { id: newFilterId }]
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
			const { items: parentItems } = currentGroup

			const filterIndex = findIndexOfChildItem(filterId, parentItems)
			const updatedParentItems = removeChildItemsFromContainer(
				filterId,
				parentItems
			)

			return {
				...prevGroupMap,
				[newSubgroupId]: {
					coordinator: or,
					items: [{ id: filterId }],
					parentGroupId
				},
				[parentGroupId]: {
					...currentGroup,
					coordinator: and,
					items: insertItemsAtIndex(
						{ id: newSubgroupId, subgroup: true },
						filterIndex,
						updatedParentItems
					)
				}
			} as FilterGroupMap
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

	// const moveFilterToNewGroup = (
	// 	filterId: string,
	// 	prevGroupId: string,
	// 	newGroupId: string
	// ) => {
	// 	// update groupId in filterMap
	// 	// Remove filterId from prevGroupId in groupMap
	// 	// Add filterId to newGroupId in groupMap
	// }

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
		updatedFilterInfo: Partial<FiltersMap>
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

		unstable_batchedUpdates(() => {
			if (filterGroupId) {
				setGroupMap(prevGroupMap => {
					const prevGroup = prevGroupMap[filterGroupId]
					const { items, parentGroupId } = prevGroup

					const { filterIds, subgroupIds } =
						getFiltersAndSubgroups(items)

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
								items: removeChildItemsFromContainer(
									filterGroupId,
									parentGroup.items
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
							items: removeChildItemsFromContainer(
								filterIdToDelete,
								prevGroup.items
							)
						}
					}
				})
			}

			setFiltersMap(prevFiltersMap =>
				omit(prevFiltersMap, filterIdToDelete)
			)
		})

		inputRef.current?.focus()
	}

	const deleteGroup = (groupIdToDelete: string) => {
		const { items, parentGroupId } = groupMap[groupIdToDelete]

		const { filterIds, subgroupIds } = getFiltersAndSubgroups(items)

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
			const { filterIds } = getFiltersAndSubgroups(
				groupMap[subgroupId].items
			)

			filtersToDelete = filtersToDelete.concat(filterIds)
		})

		unstable_batchedUpdates(() => {
			setFiltersMap(prevFiltersMap =>
				omit(prevFiltersMap, filtersToDelete)
			)
			setGroupMap(prevGroupMap => {
				let newGroupMap = omit(prevGroupMap, [
					groupIdToDelete,
					...subgroupIds
				]) as FilterGroupMap

				// If it is a subgroup, disassociate it from the parent group by removing the id
				// from subgroup ids
				if (parentGroupId) {
					const parentGroup = newGroupMap[parentGroupId]
					const { filterIds, subgroupIds } = getFiltersAndSubgroups(
						parentGroup.items
					)

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

						const { filterIds } = getFiltersAndSubgroups(
							newGroupMap[parentGroupId].items
						)

						setFiltersMap(prevFiltersMap => {
							filterIds.forEach(
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
								items: removeChildItemsFromContainer(
									groupIdToDelete,
									parentGroup.items
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
		})

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
		draggingFilterId,
		filtersMap,
		groupMap,
		lastDragOverId: lastOverId,
		numFilters,
		primaryCoordinator,
		setCurrentFilter,
		setCurrentGroup,
		setDraggingFilterId,
		setGroupMap,
		updateFilter,
		updateGroupCoordinator,
		updatePrimaryCoordinator: setPrimaryCoordinator
	}
}
