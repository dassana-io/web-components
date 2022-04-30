import cn from 'classnames'
import { convertFilterConfigToFilterUnit } from '../utils'
import { createPortal } from 'react-dom'
import { DroppableContainer } from '../FilterRenderer/DroppableContainer'
import { FilterCoordinator } from '../FilterCoordinator'
import { FilterGroup } from '../FilterGroup'
import { FilterGroupMap } from '../types'
import { FilterUnit } from '../Filter'
import has from 'lodash/has'
import omitBy from 'lodash/omitBy'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useFilterGroupStyles } from '../styles'
import { useFiltersContext } from '../FiltersContext'
import {
	CollisionDetection as CollisionDetectionType,
	defaultDropAnimation,
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	MeasuringStrategy,
	MouseSensor,
	rectIntersection,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { findContainer, onDropIntoContainer, onDropOntoItem } from './utils'
import React, { useCallback, useMemo, useRef, useState } from 'react'

const DND_CONTAINER_ID = 'filters-dnd-id'

export const FilterRenderer = () => {
	const {
		draggingFilterId: activeId,
		filtersMap,
		groupMap,
		lastDragOverId: lastOverId,
		numFilters,
		primaryCoordinator,
		setDraggingFilterId: setActiveId,
		setGroupMap
	} = useFiltersContext()

	const recentlyMovedToNewContainer = useRef(false)

	const [clonedItems, setClonedItems] = useState<FilterGroupMap | null>(null)
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				delay: 10, // Delay drag by 150ms so it doesn't conflict with control clicks
				tolerance: 5 // Pixels of motion tolerated before drag operation is aborted.
				// Ex: If the pointer is moved by more than 5 pixels during the 150ms delay before the drag action occurs, the drag operation is aborted
			}
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const classes = useFilterGroupStyles()

	const firstLevelFilterGroupIds = useMemo(
		() => Object.keys(omitBy(groupMap, group => group.parentGroupId)),
		[groupMap]
	)

	// Custom collision detection strategy optimized for multiple containers
	const collisionDetectionStrategy: CollisionDetectionType = useCallback(
		args => {
			// Start by finding any intersecting droppable
			const overId = rectIntersection(args)

			lastOverId.current = overId

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
		[activeId, lastOverId]
	)

	const onDragStart = useCallback(
		({ active }: DragStartEvent) => {
			setActiveId(active.id)
			setClonedItems(groupMap)
		},
		[groupMap, setActiveId]
	)

	const onDragCancel = useCallback(() => {
		if (clonedItems) {
			// Reset items to their original state in case items have been
			// Dragged across containers
			setGroupMap(clonedItems)
		}

		setActiveId(null)
		setClonedItems(null)
	}, [clonedItems, setActiveId, setGroupMap])

	const onDragOver = useCallback(
		({ active, over }: DragEndEvent) => {
			const activeContainer = findContainer(active.id, groupMap)
			const overId = over?.id

			if (!activeContainer || !overId) {
				setActiveId(null)

				return
			}

			if (overId !== active.id) {
				setGroupMap(prevItems => {
					const dropFn = has(groupMap, overId)
						? onDropIntoContainer
						: onDropOntoItem

					return dropFn(active.id, overId, prevItems)
				})
			}

			setActiveId(null)
		},
		[groupMap, setActiveId, setGroupMap]
	)

	return (
		<div className={classes.rendererContainer} id={DND_CONTAINER_ID}>
			{numFilters > 0 && (
				<DndContext
					collisionDetection={collisionDetectionStrategy}
					measuring={{
						droppable: {
							strategy: MeasuringStrategy.Always
						}
					}}
					onDragCancel={onDragCancel}
					onDragEnd={onDragOver}
					onDragStart={onDragStart}
					sensors={sensors}
				>
					{firstLevelFilterGroupIds.map((groupId, i) => (
						<div
							className={cn({
								[classes.filterContainer]: true,
								[classes.singleFilter]: numFilters === 1
							})}
							key={groupId}
						>
							{firstLevelFilterGroupIds.length > 1 && (
								<div
									className={cn({
										[classes.coordinator]: true,
										[classes.hide]: i === 0
									})}
								>
									<FilterCoordinator
										coordinator={primaryCoordinator}
										primary
										readOnly={i !== 1}
									/>
								</div>
							)}
							<DroppableContainer
								classes={[classes.droppableContainer]}
								id={groupId}
							>
								<FilterGroup
									groupId={groupId}
									showAddNewGroup={
										i ===
										firstLevelFilterGroupIds.length - 1
									}
								/>
							</DroppableContainer>
						</div>
					))}
					{document.getElementById(DND_CONTAINER_ID) &&
						createPortal(
							<DragOverlay
								dropAnimation={{
									...defaultDropAnimation,
									dragSourceOpacity: 0.5
								}}
							>
								{activeId && (
									<FilterUnit
										filter={convertFilterConfigToFilterUnit(
											filtersMap[activeId]
										)}
										id={activeId}
										readOnly
									/>
								)}
							</DragOverlay>,
							document.getElementById(DND_CONTAINER_ID)!
						)}
				</DndContext>
			)}
		</div>
	)
}
