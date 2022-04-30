import { createPortal } from 'react-dom'
import { DraggableItem } from './DraggableItem'
import { DroppableContainer } from './DroppableContainer'
import has from 'lodash/has'
import {
	closestCenter,
	CollisionDetection as CollisionDetectionType,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	MeasuringStrategy,
	Modifiers,
	MouseSensor,
	rectIntersection,
	UniqueIdentifier,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { onDropIntoContainer, onDropOntoItem } from './utils'
import React, {
	FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'

export interface DragDropProps {
	containers?: string[]
	minimal?: boolean
	modifiers?: Modifiers
}

// export const DragDrop: FC<DragDropProps> = ({
// 	containers = ['A', 'B', 'C', 'D'],
// 	modifiers
// }: DragDropProps) => {
// 	const [isDragging, setIsDragging] = useState(false)
// 	const [parent, setParent] = useState<UniqueIdentifier | null>(null)

// 	const item = <DraggableItem id='drag-id-1'>Drag Me</DraggableItem>

// 	return (
// 		<DndContext
// 			modifiers={parent === null ? undefined : modifiers}
// 			onDragCancel={() => setIsDragging(false)}
// 			onDragEnd={({ over }) => {
// 				setParent(over ? over.id : null)
// 				setIsDragging(false)
// 			}}
// 			onDragStart={() => setIsDragging(true)}
// 		>
// 			<div>{parent === null ? item : null}</div>
// 			{containers.map(id => (
// 				<DraggableItem id={id} key={id}>
// 					<DroppableContainer dragging={isDragging} id={id}>
// 						<div style={{ padding: '30px' }}>
// 							{parent === id ? item : null}
// 							<div>{`Drop here ${id}`}</div>
// 						</div>
// 					</DroppableContainer>
// 				</DraggableItem>
// 			))}
// 			<DragOverlay>{isDragging ? <div>Drag Me</div> : null}</DragOverlay>
// 		</DndContext>
// 	)
// }

const PLACEHOLDER_ID = 'placeholder'
const TRASH_ID = 'void'

export interface ChildItem {
	container?: boolean
	draggable?: boolean
	id: string
}

interface ContainerConfig {
	children: ChildItem[]
	level: number
	parentId?: string
}

export type Containers = Record<string, ContainerConfig>

const generateContainers = (): Containers => ({
	'group-id-1': {
		children: [
			{
				draggable: true,
				id: 'filter-1'
			},
			{
				draggable: true,
				id: 'filter-2'
			},
			{
				draggable: true,
				id: 'filter-3'
			}
		],
		level: 1
	},
	'group-id-2': {
		children: [
			{
				draggable: true,
				id: 'filter-4'
			}
		],
		level: 1
	}
})

export const DragDrop: FC<DragDropProps> = ({
	minimal = false,
	modifiers
}: DragDropProps) => {
	const [items, setItems] = useState<Containers>(generateContainers())
	const [containers, setContainers] = useState(Object.keys(items))
	const [activeId, setActiveId] = useState<string | null>(null)
	const lastOverId = useRef<UniqueIdentifier | null>(null)
	const recentlyMovedToNewContainer = useRef(false)

	const [clonedItems, setClonedItems] = useState<Containers | null>(null)
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const firstLevelContainers = useMemo(
		() =>
			Object.keys(items).filter(
				containerId => items[containerId].level === 1
			),
		[items]
	)

	// Custom collision detection strategy optimized for multiple containers
	const collisionDetectionStrategy: CollisionDetectionType = useCallback(
		args => {
			// Start by finding any intersecting droppable
			const overId = rectIntersection(args)

			if (activeId && activeId in items) {
				return closestCenter({
					...args,
					droppableContainers: args.droppableContainers.filter(
						container => container.id in items
					)
				})
			}

			// if (overId !== null) {
			// 	// if (overId in items) {
			// 	// 	const containerItems = items[overId].children.map(
			// 	// 		({ id }) => id
			// 	// 	)

			// 	// 	// If a container is matched and it contains items (columns 'A', 'B', 'C')
			// 	// 	if (containerItems.length > 0) {
			// 	// 		// Return the closest droppable within that container
			// 	// 		overId = closestCenter({
			// 	// 			...args,
			// 	// 			droppableContainers:
			// 	// 				args.droppableContainers.filter(
			// 	// 					container =>
			// 	// 						container.id !== overId &&
			// 	// 						containerItems.includes(container.id)
			// 	// 				)
			// 	// 		})
			// 	// 	}
			// 	// }

			// 	lastOverId.current = overId

			// 	return overId
			// }
			lastOverId.current = overId

			// When a draggable item moves to a new container, the layout may shift
			// and the `overId` may become `null`. We manually set the cached `lastOverId`
			// to the id of the draggable item that was moved to the new container, otherwise
			// the previous `overId` will be returned which can cause items to incorrectly shift positions
			if (recentlyMovedToNewContainer.current) {
				lastOverId.current = activeId
			}
			console.log(overId, 'over id')
			// If no droppable is matched, return the last match
			return lastOverId.current
		},
		[activeId, items]
	)

	const findContainer = (idToFind: string) => {
		if (idToFind in items) {
			return idToFind
		}

		return Object.keys(items).find(key =>
			items[key].children.find(({ id }) => id === idToFind)
		)
	}

	function getNextContainerId() {
		const containeIds = Object.keys(items)
		const lastContaineId = containeIds[containeIds.length - 1]

		return String.fromCharCode(lastContaineId.charCodeAt(0) + 1)
	}

	const onDragCancel = () => {
		if (clonedItems) {
			// Reset items to their original state in case items have been
			// Dragged across containrs
			setItems(clonedItems)
		}

		setActiveId(null)
		setClonedItems(null)
	}

	useEffect(() => {
		requestAnimationFrame(() => {
			recentlyMovedToNewContainer.current = false
		})
	}, [items])

	const renderItems = (itemsToRender: ChildItem[]) => {
		const itemIds = itemsToRender.map(({ id }) => id)

		return (
			<SortableContext
				items={itemIds}
				strategy={verticalListSortingStrategy}
			>
				{itemsToRender.map(({ id, draggable, container }) => {
					const containerInfo = items[id] || {}

					const item = draggable ? (
						<DraggableItem id={id}>{id}</DraggableItem>
					) : (
						<div>{id}</div>
					)

					return container ? (
						<DroppableContainer id={id} key={id}>
							{containerInfo.children &&
							containerInfo.children.length
								? renderItems(containerInfo.children)
								: item}
						</DroppableContainer>
					) : (
						<span key={id}>{item}</span>
					)
				})}
			</SortableContext>
		)
	}

	return (
		<div id='dnd-test-container'>
			<DndContext
				// cancelDrop={cancelDrop}
				collisionDetection={collisionDetectionStrategy}
				measuring={{
					droppable: {
						strategy: MeasuringStrategy.Always
					}
				}}
				modifiers={modifiers}
				onDragCancel={onDragCancel}
				onDragEnd={({ active, over }) => {
					const activeContainer = findContainer(active.id)

					if (!activeContainer) {
						setActiveId(null)
						return
					}

					const overId = over?.id

					if (!overId) {
						setActiveId(null)
						return
					}

					if (overId !== active.id) {
						setItems(prevItems => {
							const dropFn = has(items, overId)
								? onDropIntoContainer
								: onDropOntoItem

							return dropFn(active.id, overId, prevItems)
						})
					}

					setActiveId(null)
				}}
				// onDragOver={({ active, over }) => {
				// 	const overId = over?.id

				// 	if (!overId || overId === TRASH_ID || active.id in items) {
				// 		return
				// 	}

				// 	const overContainer = findContainer(overId)
				// 	const activeContainer = findContainer(active.id)
				// 	// console.log(overContainer, 'overContainer')
				// 	// console.log(activeContainer, 'activeContainer')
				// 	if (!overContainer || !activeContainer) {
				// 		return
				// 	}

				// 	if (activeContainer !== overContainer) {
				// 		setItems(items => {
				// 			const activeItems = items[
				// 				activeContainer
				// 			].children.map(({ id }) => id)
				// 			const overItems = items[overContainer].children.map(
				// 				({ id }) => id
				// 			)
				// 			const overIndex = overItems.indexOf(overId)
				// 			const activeIndex = activeItems.indexOf(active.id)

				// 			let newIndex: number

				// 			if (overId in items) {
				// 				newIndex = overItems.length + 1
				// 			} else {
				// 				const isBelowOverItem =
				// 					over &&
				// 					active.rect.current.translated &&
				// 					active.rect.current.translated.offsetTop >
				// 						over.rect.offsetTop + over.rect.height

				// 				const modifier = isBelowOverItem ? 1 : 0

				// 				newIndex =
				// 					overIndex >= 0
				// 						? overIndex + modifier
				// 						: overItems.length + 1
				// 			}

				// 			recentlyMovedToNewContainer.current = true

				// 			// swap ids and delete containers if necessary
				// 			debugger
				// 			return {
				// 				...items,
				// 				[activeContainer]: items[
				// 					activeContainer
				// 				].filter(item => item !== active.id),
				// 				[overContainer]: [
				// 					...items[overContainer].slice(0, newIndex),
				// 					items[activeContainer][activeIndex],
				// 					...items[overContainer].slice(
				// 						newIndex,
				// 						items[overContainer].length
				// 					)
				// 				]
				// 			}
				// 		})
				// 	}

				// 	if (
				// 		activeContainer === overContainer &&
				// 		overId !== active.id
				// 	) {
				// 		console.log(overId, 'over id')
				// 		console.log(active.id, 'active id')

				// 		// const newSubgroupId = uuidV4()
				// 		// const subgroupChildrenIds = [overId, active.id]

				// 		// setItems(prevItems => ({
				// 		// 	...prevItems,
				// 		// 	[activeContainer]: {
				// 		// 		children: prevItems[
				// 		// 			activeContainer
				// 		// 		].children.filter(({ id }) =>
				// 		// 			subgroupChildrenIds.includes(id)
				// 		// 		)
				// 		// 	},
				// 		// 	[newSubgroupId]: {
				// 		// 		children: subgroupChildrenIds.map(id => ({
				// 		// 			draggable: true,
				// 		// 			id
				// 		// 		})),
				// 		// 		parentId: activeContainer
				// 		// 	}
				// 		// }))
				// 	}
				// }}
				onDragStart={({ active }) => {
					setActiveId(active.id)
					setClonedItems(items)
				}}
				sensors={sensors}
			>
				<div
					style={{
						display: 'inline-grid',
						boxSizing: 'border-box',
						padding: 20
						// gridAutoFlow: vertical ? 'row' : 'column'
					}}
				>
					{firstLevelContainers.map(containerId => (
						<DroppableContainer id={containerId} key={containerId}>
							{renderItems(items[containerId].children)}
						</DroppableContainer>
					))}
				</div>
				{document.getElementById('dnd-test-container') &&
					createPortal(
						// <DragOverlay
						// 	adjustScale={adjustScale}
						// 	dropAnimation={dropAnimation}
						// >
						// 	{activeId
						// 		? containers.includes(activeId)
						// 			? renderContainerDragOverlay(activeId)
						// 			: renderSortableItemDragOverlay(activeId)
						// 		: null}
						// </DragOverlay>
						<DragOverlay>
							<div>{activeId ? activeId : null}</div>
						</DragOverlay>,
						document.getElementById('dnd-test-container')!
					)}
			</DndContext>
		</div>
	)
}
