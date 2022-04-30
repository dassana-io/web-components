import castArray from 'lodash/castArray'
import omit from 'lodash/omit'
import { v4 as uuidV4 } from 'uuid'
import { ChildItem, Containers } from '.'

const findContainer = (idToFind: string, items: Containers) => {
	if (idToFind in items) {
		return idToFind
	}

	return Object.keys(items).find(key =>
		items[key].children.find(({ id }) => id === idToFind)
	)
}

const findIndexOfChildItem = (idToFind: string, items: ChildItem[]) =>
	items.findIndex(({ id }) => id === idToFind)

const getItemFromContainer = (itemId: string, items: ChildItem[]) =>
	items.find(({ id }) => id === itemId)

const removeChildItemsFromContainer = (
	idsToRemove: string | string[],
	items: ChildItem[]
) => items.filter(({ id }) => !castArray(idsToRemove).includes(id))

const generateNewSubgroupContainerItem = (id: string): ChildItem => ({
	container: true,
	id
})

const insertItemsAtIndex = <T>(item: T | T[], index: number, itemArr: T[]) => [
	...itemArr.slice(0, index),
	...castArray(item),
	...itemArr.slice(index, itemArr.length)
]

export const moveChildItemToNewContainer = (
	itemId: string,
	currentContainerId: string,
	destinationContainerId: string,
	items: Containers
): Containers => {
	const currentContainer = items[currentContainerId]
	const { children: currContainerChildren, level: currContainerLevel } =
		currentContainer
	const item = getItemFromContainer(itemId, currContainerChildren)!
	const nextCurrentContainerItems = removeChildItemsFromContainer(
		itemId,
		currContainerChildren
	)

	const destinationContainer = items[destinationContainerId]
	const nextDestinationContainerItems = destinationContainer.children.concat([
		item
	])

	let newItems = items

	newItems = {
		...newItems,
		[currentContainerId]: {
			...currentContainer,
			children: nextCurrentContainerItems
		},
		[destinationContainerId]: {
			...destinationContainer,
			children: nextDestinationContainerItems
		}
	}

	if (nextCurrentContainerItems.length === 0) {
		newItems = omit(newItems, currentContainerId)
	}

	if (nextCurrentContainerItems.length === 1) {
		const currContainerIsSubgroup = currContainerLevel === 2
		const { container: childContainerIsSubgroup, id: childContainerId } =
			nextCurrentContainerItems[0]

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
	items: Containers
): Containers => {
	const { children: subgroupItems, parentId } = items[subgroupContainerId]

	if (parentId) {
		const parentContainer = items[parentId]
		const { children } = parentContainer
		const subgroupContainerIndex = findIndexOfChildItem(
			subgroupContainerId,
			children
		)
		const parentContainerItems = removeChildItemsFromContainer(
			subgroupContainerId,
			children
		)

		return {
			...omit(items, subgroupContainerId),
			[parentId]: {
				...parentContainer,
				children: insertItemsAtIndex(
					subgroupItems,
					subgroupContainerIndex,
					parentContainerItems
				)
			}
		}
	}

	return items
}

export const createSubgroupWithinContainer = (
	activeItemId: string,
	overItemId: string,
	parentContainerId: string,
	items: Containers
): Containers => {
	const subgroupIds = [activeItemId, overItemId]
	const newSubgroupId = uuidV4()

	const parentContainer = items[parentContainerId]
	const { children } = parentContainer
	const overItemIndex = findIndexOfChildItem(overItemId, children)

	const [newSubgroupItems, remainingParentContainerItems] = children.reduce<
		[ChildItem[], ChildItem[]]
	>(
		(result, item) => {
			const arrayIndex = subgroupIds.includes(item.id) ? 0 : 1

			result[arrayIndex].push(item)

			return result
		},
		[[], []]
	)

	const subgroupContainerItem: ChildItem =
		generateNewSubgroupContainerItem(newSubgroupId)

	return {
		...items,
		[newSubgroupId]: {
			children: newSubgroupItems,
			level: 2,
			parentId: parentContainerId
		},
		[parentContainerId]: {
			...parentContainer,
			children: insertItemsAtIndex<ChildItem>(
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
	items: Containers
): Containers => {
	let nextItems = items

	const destinationContainer = items[parentContainerId]
	const { children: destChildren, level: destLevel } = destinationContainer
	const overItem = getItemFromContainer(overItemId, destChildren)
	const overItemIndex = findIndexOfChildItem(overItemId, destChildren)
	const nextDestContainerItems = removeChildItemsFromContainer(
		overItemId,
		destChildren
	)

	const currentContainer = items[currentContainerId]
	const { children: activeChildren, level: activeLevel } = currentContainer
	const activeItem = getItemFromContainer(activeItemId, activeChildren)
	const nextActiveContainerItems = removeChildItemsFromContainer(
		activeItemId,
		activeChildren
	)

	if (destLevel === 1 && destChildren.length > 1) {
		if (overItem && activeItem) {
			const newSubgroupId = uuidV4()
			const newSubgroupContainerItem: ChildItem =
				generateNewSubgroupContainerItem(newSubgroupId)

			// If destination children.length > 1, create subgroup
			nextItems = {
				...nextItems,
				[currentContainerId]: {
					...currentContainer,
					children: nextActiveContainerItems
				},
				[newSubgroupId]: {
					children: [overItem, activeItem],
					level: 2,
					parentId: parentContainerId
				},
				[parentContainerId]: {
					...destinationContainer,
					children: insertItemsAtIndex(
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
	if (destLevel === 2 || destChildren.length < 2) {
		nextItems = moveChildItemToNewContainer(
			activeItemId,
			currentContainerId,
			parentContainerId,
			items
		)
	}

	// If active container is subgroup, make sure there is more than one item remaining
	// If only one item remaining in subgroup, merge item into parent group
	if (activeLevel > 1 && nextActiveContainerItems.length === 1) {
		nextItems = mergeSubgroupIntoParentContainer(
			currentContainerId,
			nextItems
		)
	}

	if (nextActiveContainerItems.length === 0)
		nextItems = omit(nextItems, currentContainerId)

	return nextItems
}

export const onDropIntoContainer = (
	activeId: string,
	overId: string,
	items: Containers
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
	items: Containers
) => {
	let nextItems = items
	const currentContainerId = findContainer(activeId, items)
	const destinationContainerId = findContainer(overId, items)

	console.log(currentContainerId, 'current container id')
	console.log(destinationContainerId, 'destination container id')

	if (currentContainerId && destinationContainerId) {
		const { children, level } = items[destinationContainerId]

		if (level === 1) {
			// Item was dragged on top of another item within the same container
			if (
				currentContainerId === destinationContainerId &&
				children.length > 2
			) {
				nextItems = createSubgroupWithinContainer(
					activeId,
					overId,
					destinationContainerId,
					items
				)
			}
		}

		if (currentContainerId !== destinationContainerId) {
			if (children.length > 1) {
				nextItems = createSubgroupInDestContainer(
					activeId,
					overId,
					currentContainerId,
					destinationContainerId,
					items
				)
			} else {
				nextItems = moveChildItemToNewContainer(
					activeId,
					currentContainerId,
					destinationContainerId,
					items
				)
			}
		}
	}

	return nextItems
}
