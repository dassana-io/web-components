import { DraggableItem } from './DraggableItem'
import { DroppableContainer } from './DroppableContainer'
import { v4 as uuidV4 } from 'uuid'
import { createPortal, unstable_batchedUpdates } from 'react-dom'
import {
	CancelDrop,
	closestCenter,
	CollisionDetection as CollisionDetectionType,
	defaultDropAnimation,
	DndContext,
	DragOverlay,
	DropAnimation,
	KeyboardSensor,
	MeasuringStrategy,
	Modifiers,
	MouseSensor,
	rectIntersection,
	TouchSensor,
	UniqueIdentifier,
	useDroppable,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import {
	AnimateLayoutChanges,
	arrayMove,
	defaultAnimateLayoutChanges,
	horizontalListSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
	SortingStrategy,
	useSortable,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

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

type Items = Record<string, string[]>

const generateItems = (): Items => ({
	[uuidV4()]: ['filter-1', 'filter-4'],
	[uuidV4()]: ['filter-2'],
	[uuidV4()]: ['filter-3']
})

export const DragDrop: FC<DragDropProps> = ({
	minimal = false,
	modifiers
}: DragDropProps) => {
	const [items, setItems] = useState<Items>(generateItems())
	const [containers, setContainers] = useState(Object.keys(items))
	const [activeId, setActiveId] = useState<string | null>(null)
	const lastOverId = useRef<UniqueIdentifier | null>(null)
	const recentlyMovedToNewContainer = useRef(false)

	const [clonedItems, setClonedItems] = useState<Items | null>(null)
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	// Custom collision detection strategy optimized for multiple containers
	const collisionDetectionStrategy: CollisionDetectionType = useCallback(
		args => {
			// Start by finding any intersecting droppable
			let overId = rectIntersection(args)

			if (activeId && activeId in items) {
				return closestCenter({
					...args,
					droppableContainers: args.droppableContainers.filter(
						container => container.id in items
					)
				})
			}

			if (overId !== null) {
				if (overId in items) {
					const containerItems = items[overId]

					// If a container is matched and it contains items (columns 'A', 'B', 'C')
					if (containerItems.length > 0) {
						// Return the closest droppable within that container
						overId = closestCenter({
							...args,
							droppableContainers:
								args.droppableContainers.filter(
									container =>
										container.id !== overId &&
										containerItems.includes(container.id)
								)
						})
					}
				}

				lastOverId.current = overId

				return overId
			}

			// When a draggable item moves to a new container, the layout may shift
			// and the `overId` may become `null`. We manually set the cached `lastOverId`
			// to the id of the draggable item that was moved to the new container, otherwise
			// the previous `overId` will be returned which can cause items to incorrectly shift positions
			if (recentlyMovedToNewContainer.current) {
				lastOverId.current = activeId
			}

			// If no droppable is matched, return the last match
			return lastOverId.current
		},
		[activeId, items]
	)

	const findContainer = (id: string) => {
		if (id in items) {
			return id
		}

		return Object.keys(items).find(key => items[key].includes(id))
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
					if (active.id in items && over?.id) {
						setContainers(containers => {
							const activeIndex = containers.indexOf(active.id)
							const overIndex = containers.indexOf(over.id)

							return arrayMove(containers, activeIndex, overIndex)
						})
					}

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

					if (overId === PLACEHOLDER_ID) {
						const newContainerId = getNextContainerId()

						unstable_batchedUpdates(() => {
							setContainers(containers => [
								...containers,
								newContainerId
							])

							setItems(items => ({
								...items,
								[activeContainer]: items[
									activeContainer
								].filter(id => id !== activeId),
								[newContainerId]: [active.id]
							}))

							setActiveId(null)
						})
						return
					}

					const overContainer = findContainer(overId)

					if (overContainer) {
						const activeIndex = items[activeContainer].indexOf(
							active.id
						)
						const overIndex = items[overContainer].indexOf(overId)

						if (activeIndex !== overIndex) {
							setItems(items => ({
								...items,
								[overContainer]: arrayMove(
									items[overContainer],
									activeIndex,
									overIndex
								)
							}))
						}
					}

					setActiveId(null)
				}}
				onDragOver={({ active, over }) => {
					const overId = over?.id

					if (!overId || overId === TRASH_ID || active.id in items) {
						return
					}

					const overContainer = findContainer(overId)
					const activeContainer = findContainer(active.id)

					if (!overContainer || !activeContainer) {
						return
					}

					if (activeContainer !== overContainer) {
						setItems(items => {
							const activeItems = items[activeContainer]
							const overItems = items[overContainer]
							const overIndex = overItems.indexOf(overId)
							const activeIndex = activeItems.indexOf(active.id)

							let newIndex: number

							if (overId in items) {
								newIndex = overItems.length + 1
							} else {
								const isBelowOverItem =
									over &&
									active.rect.current.translated &&
									active.rect.current.translated.offsetTop >
										over.rect.offsetTop + over.rect.height

								const modifier = isBelowOverItem ? 1 : 0

								newIndex =
									overIndex >= 0
										? overIndex + modifier
										: overItems.length + 1
							}

							recentlyMovedToNewContainer.current = true

							return {
								...items,
								[activeContainer]: items[
									activeContainer
								].filter(item => item !== active.id),
								[overContainer]: [
									...items[overContainer].slice(0, newIndex),
									items[activeContainer][activeIndex],
									...items[overContainer].slice(
										newIndex,
										items[overContainer].length
									)
								]
							}
						})
					}
				}}
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
					{containers.map(containerId => (
						// <DroppableContainer
						// 	columns={columns}
						// 	id={containerId}
						// 	items={items[containerId]}
						// 	key={containerId}
						// 	label={minimal ? undefined : `Column ${containerId}`}
						// 	onRemove={() => handleRemove(containerId)}
						// 	scrollable={scrollable}
						// 	style={containerStyle}
						// 	unstyled={minimal}
						// >
						// 	{items[containerId].map((value, index) => {
						// 		return (
						// 			<SortableItem
						// 				containerId={containerId}
						// 				disabled={isSortingContainer}
						// 				getIndex={getIndex}
						// 				handle={handle}
						// 				id={value}
						// 				index={index}
						// 				key={value}
						// 				renderItem={renderItem}
						// 				style={getItemStyles}
						// 				wrapperStyle={wrapperStyle}
						// 			/>
						// 		)
						// 	})}
						// </DroppableContainer>
						<DroppableContainer id={containerId} key={containerId}>
							<SortableContext
								items={items[containerId]}
								strategy={verticalListSortingStrategy}
							>
								{items[containerId].map((val, i) => {
									return (
										<DraggableItem id={val} key={i}>
											<div>{val}</div>
										</DraggableItem>
									)
								})}
							</SortableContext>
						</DroppableContainer>
					))}
					{minimal ? undefined : (
						// <DroppableContainer
						// 	disabled={isSortingContainer}
						// 	id={PLACEHOLDER_ID}
						// 	items={empty}
						// 	onClick={handleAddColumn}
						// 	placeholder
						// >
						// 	+ Add column
						// </DroppableContainer>
						<div></div>
					)}
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
				{/* {trashable && activeId && !containers.includes(activeId) ? (
				<Trash id={TRASH_ID} />
			) : null} */}
			</DndContext>
		</div>
	)
}
