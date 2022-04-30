import castArray from 'lodash/castArray'
import omit from 'lodash/omit'
import { v4 as uuidV4 } from 'uuid'
import { FilterCoordinators, FilterGroupMap, Item } from '../types'

export const findContainer = (idToFind: string, items: FilterGroupMap) => {
	if (idToFind in items) {
		return idToFind
	}

	return Object.keys(items).find(key =>
		items[key].items.find(({ id }) => id === idToFind)
	)
}

export const findIndexOfChildItem = (idToFind: string, items: Item[]) =>
	items.findIndex(({ id }) => id === idToFind)

export const getItemFromContainer = (itemId: string, items: Item[]) =>
	items.find(({ id }) => id === itemId)

export const removeChildItemsFromContainer = (
	idsToRemove: string | string[],
	items: Item[]
) => items.filter(({ id }) => !castArray(idsToRemove).includes(id))

const generateNewSubgroupContainerItem = (id: string): Item => ({
	id,
	subgroup: true
})

export const insertItemsAtIndex = <T>(
	item: T | T[],
	index: number,
	itemArr: T[]
) => [
	...itemArr.slice(0, index),
	...castArray(item),
	...itemArr.slice(index, itemArr.length)
]

export const moveChildItemToNewContainer = (
	itemId: string,
	currentContainerId: string,
	destinationContainerId: string,
	groupMap: FilterGroupMap
): FilterGroupMap => {
	const currentContainer = groupMap[currentContainerId]
	const {
		items: currContainerChildren,
		parentGroupId: currContainerIsSubgroup
	} = currentContainer
	const item = getItemFromContainer(itemId, currContainerChildren)!
	const nextCurrentContainerItems = removeChildItemsFromContainer(
		itemId,
		currContainerChildren
	)

	const destinationContainer = groupMap[destinationContainerId]
	const nextDestinationContainerItems = destinationContainer.items.concat([
		item
	])

	let newItems = groupMap

	newItems = {
		...newItems,
		[currentContainerId]: {
			...currentContainer,
			items: nextCurrentContainerItems
		},
		[destinationContainerId]: {
			...destinationContainer,
			items: nextDestinationContainerItems
		}
	}

	if (nextCurrentContainerItems.length === 0) {
		newItems = omit(newItems, currentContainerId)
	}

	if (nextCurrentContainerItems.length === 1) {
		const {
			subgroup: childContainerIsSubgroup = false,
			id: childContainerId
		} = nextCurrentContainerItems[0]

		/**
		 * Move items to parent container if
		 * 		1. Current container is a subgroup and there is only one item left
		 * 		2. Remaining item within container is a subgroup
		 */
		if (currContainerIsSubgroup || childContainerIsSubgroup) {
			newItems = mergeSubgroupIntoParentContainer(
				currContainerIsSubgroup ? currentContainerId : childContainerId,
				newItems
			)
		}
	}

	return newItems
}

export const mergeSubgroupIntoParentContainer = (
	subgroupContainerId: string,
	groupMap: FilterGroupMap
): FilterGroupMap => {
	const { items: subgroupItems, parentGroupId } =
		groupMap[subgroupContainerId]

	if (parentGroupId) {
		const parentContainer = groupMap[parentGroupId]
		const { items } = parentContainer
		const subgroupContainerIndex = findIndexOfChildItem(
			subgroupContainerId,
			items
		)
		const parentContainerItems = removeChildItemsFromContainer(
			subgroupContainerId,
			items
		)

		return {
			...omit(groupMap, subgroupContainerId),
			[parentGroupId]: {
				...parentContainer,
				items: insertItemsAtIndex(
					subgroupItems,
					subgroupContainerIndex,
					parentContainerItems
				)
			}
		}
	}

	return groupMap
}

export const createSubgroupWithinContainer = (
	activeItemId: string,
	overItemId: string,
	parentContainerId: string,
	groupMap: FilterGroupMap
): FilterGroupMap => {
	const subgroupIds = [activeItemId, overItemId]
	const newSubgroupId = uuidV4()

	const parentContainer = groupMap[parentContainerId]
	const { items } = parentContainer
	const overItemIndex = findIndexOfChildItem(overItemId, items)

	const [newSubgroupItems, remainingParentContainerItems] = items.reduce<
		[Item[], Item[]]
	>(
		(result, item) => {
			const arrayIndex = subgroupIds.includes(item.id) ? 0 : 1

			result[arrayIndex].push(item)

			return result
		},
		[[], []]
	)

	const subgroupContainerItem: Item =
		generateNewSubgroupContainerItem(newSubgroupId)

	return {
		...groupMap,
		[newSubgroupId]: {
			coordinator: FilterCoordinators.or,
			items: newSubgroupItems,
			parentGroupId: parentContainerId
		},
		[parentContainerId]: {
			...parentContainer,
			items: insertItemsAtIndex<Item>(
				subgroupContainerItem,
				overItemIndex,
				remainingParentContainerItems
			)
		}
	}
}

export const createSubgroupInDestContainer = (
	activeItemId: string,
	overItemId: string,
	currentContainerId: string,
	parentContainerId: string,
	items: FilterGroupMap
): FilterGroupMap => {
	let nextItems = items

	const destinationContainer = items[parentContainerId]
	const { items: destChildren, parentGroupId: destContainerIsSubgroup } =
		destinationContainer
	const overItem = getItemFromContainer(overItemId, destChildren)
	const overItemIndex = findIndexOfChildItem(overItemId, destChildren)
	const nextDestContainerItems = removeChildItemsFromContainer(
		overItemId,
		destChildren
	)

	const currentContainer = items[currentContainerId]
	const { items: activeChildren, parentGroupId: currContainerIsSubgroup } =
		currentContainer
	const activeItem = getItemFromContainer(activeItemId, activeChildren)
	const nextActiveContainerItems = removeChildItemsFromContainer(
		activeItemId,
		activeChildren
	)

	if (!destContainerIsSubgroup && destChildren.length > 1) {
		if (overItem && activeItem) {
			const newSubgroupId = uuidV4()
			const newSubgroupContainerItem: Item =
				generateNewSubgroupContainerItem(newSubgroupId)

			// If destination children.length > 1, create subgroup
			nextItems = {
				...nextItems,
				[currentContainerId]: {
					...currentContainer,
					items: nextActiveContainerItems
				},
				[newSubgroupId]: {
					coordinator: FilterCoordinators.or,
					items: [overItem, activeItem],
					parentGroupId: parentContainerId
				},
				[parentContainerId]: {
					...destinationContainer,
					items: insertItemsAtIndex<Item>(
						newSubgroupContainerItem,
						overItemIndex,
						nextDestContainerItems
					)
				}
			}
		}
	}

	// If destination container is already a subgroup or there are not enough items to create a subgroup,
	// move item to container instead
	if (destContainerIsSubgroup || destChildren.length < 2) {
		nextItems = moveChildItemToNewContainer(
			activeItemId,
			currentContainerId,
			parentContainerId,
			items
		)
	}

	// If active container is subgroup, make sure there is more than one item remaining
	// If only one item remaining in subgroup, merge item into parent group
	if (nextActiveContainerItems.length === 1) {
		const { id, subgroup: childContainerIsSubgroup } =
			nextActiveContainerItems[0]

		if (currContainerIsSubgroup || childContainerIsSubgroup) {
			const subgroupIdToMerge = currContainerIsSubgroup
				? currentContainerId
				: id

			nextItems = mergeSubgroupIntoParentContainer(
				subgroupIdToMerge,
				nextItems
			)
		}
	}

	if (nextActiveContainerItems.length === 0)
		nextItems = omit(nextItems, currentContainerId)

	return nextItems
}

export const onDropIntoContainer = (
	activeId: string,
	overId: string,
	items: FilterGroupMap
) => {
	const currentContainerId = findContainer(activeId, items)
	const destContainerId = findContainer(overId, items)

	if (currentContainerId && currentContainerId !== destContainerId) {
		return moveChildItemToNewContainer(
			activeId,
			currentContainerId,
			overId,
			items
		)
	}

	return items
}

export const onDropOntoItem = (
	activeId: string,
	overId: string,
	groupMap: FilterGroupMap
) => {
	let nextItems = groupMap
	const currentContainerId = findContainer(activeId, groupMap)
	const destinationContainerId = findContainer(overId, groupMap)

	console.log(currentContainerId, 'current container id')
	console.log(destinationContainerId, 'destination container id')

	if (currentContainerId && destinationContainerId) {
		const { items, parentGroupId } = groupMap[destinationContainerId]

		if (!parentGroupId) {
			// Item was dragged on top of another item within the same container
			if (
				currentContainerId === destinationContainerId &&
				items.length > 2
			) {
				nextItems = createSubgroupWithinContainer(
					activeId,
					overId,
					destinationContainerId,
					groupMap
				)
			}
		}

		if (currentContainerId !== destinationContainerId) {
			if (items.length > 1) {
				nextItems = createSubgroupInDestContainer(
					activeId,
					overId,
					currentContainerId,
					destinationContainerId,
					groupMap
				)
			} else {
				nextItems = moveChildItemToNewContainer(
					activeId,
					currentContainerId,
					destinationContainerId,
					groupMap
				)
			}
		}
	}

	return nextItems
}
