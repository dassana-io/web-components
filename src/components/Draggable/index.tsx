import { createPortal } from 'react-dom'
import { createUseStyles } from 'react-jss'
import { type DataId } from 'components/Table'
import DraggableItem from './DraggableItem'
import isEqual from 'lodash/isEqual'
import ItemOverlay from './ItemOverlay'
import { usePrevious } from '@dassana-io/web-utils'
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	type SortingStrategy,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
	closestCenter,
	defaultDropAnimation,
	defaultDropAnimationSideEffects,
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	type DropAnimation,
	getClientRect,
	type Modifiers,
	type PointerActivationConstraint,
	PointerSensor,
	type UniqueIdentifier,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import React, { type ReactNode, useEffect, useState } from 'react'
import {
	restrictToHorizontalAxis,
	restrictToParentElement,
	restrictToVerticalAxis
} from '@dnd-kit/modifiers'

const useStyles = createUseStyles({
	container: {
		'& div:focus': {
			outline: 'none' // Removes blue outline around focused items
		}
	}
})

const dropAnimationConfig: DropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: '0.5'
			}
		}
	})
}

export enum Directions {
	horizontal = 'horizontal',
	vertical = 'vertical'
}

const { horizontal, vertical } = Directions

interface DirectionConfig {
	modifiers: Modifiers
	sortingStrategy: SortingStrategy
}

const directionConfigMap: Record<Directions, DirectionConfig> = {
	[horizontal]: {
		modifiers: [restrictToHorizontalAxis],
		sortingStrategy: horizontalListSortingStrategy
	},
	[vertical]: {
		modifiers: [restrictToVerticalAxis],
		sortingStrategy: verticalListSortingStrategy
	}
}

export interface OnDragEndProperties {
	newIndex: number
	newItemOrder: UniqueIdentifier[]
	prevIndex: number
	prevItemOrder: UniqueIdentifier[]
}

interface DraggableProps<T> {
	activationConstraint?: PointerActivationConstraint
	direction?: Directions
	disabled?: boolean
	dragOverlayContainerId?: string
	items: T[]
	modifiers?: Modifiers
	onDragEnd: (properties: OnDragEndProperties) => void
	renderItem: (item: T, index: number, isDragging: boolean) => ReactNode
	renderOverlay?: (activeItem: T, activeItemIndex: number) => ReactNode
	separator?: ReactNode
	strategy?: SortingStrategy
}

export const Draggable = <T extends DataId>({
	activationConstraint,
	direction,
	disabled = false,
	dragOverlayContainerId = 'dnd-container',
	items,
	modifiers = [],
	onDragEnd,
	renderItem,
	renderOverlay,
	separator,
	strategy
}: DraggableProps<T>) => {
	const [activeItemId, setActiveItemId] = useState<UniqueIdentifier>()
	const [itemOrder, setItemOrder] = useState<UniqueIdentifier[]>(
		items.map(item => item.id as string)
	)
	const prevItems = usePrevious(items)
	const prevItemOrder = usePrevious(itemOrder)!

	const classes = useStyles()

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 150, // Delay drag by 150ms so it doesn't conflict with control clicks
				tolerance: 5, // Pixels of motion tolerated before drag operation is aborted.
				// Ex: If the pointer is moved by more than 5 pixels during the 150ms delay before the drag action occurs, the drag operation is aborted
				...activationConstraint
			}
		})
	)

	const handleDragStart = (event: DragStartEvent) => {
		// On drag start, set active item ID for correct styling of the overlay and draggable item
		const { active } = event

		setActiveItemId(active.id)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (!over) return

		if (active.id !== over.id) {
			// Find previous and new index of the item from the previous item order and use it to create the
			// new item order and store it in state
			const prevIndex = prevItemOrder.indexOf(active.id)
			const newIndex = prevItemOrder.indexOf(over.id)

			const newItemOrder = arrayMove(prevItemOrder, prevIndex, newIndex)

			setItemOrder(newItemOrder)

			onDragEnd({
				newIndex,
				newItemOrder,
				prevIndex,
				prevItemOrder
			})
		}

		setActiveItemId(undefined)
	}

	if (direction) {
		// Add modifiers and sorting strategy if a direction is passed in
		// If a direction is specified, dragging is restricted to the direction axis
		const { modifiers: directionModifiers, sortingStrategy } =
			directionConfigMap[direction]

		modifiers = [...modifiers, ...directionModifiers]

		strategy = strategy ?? sortingStrategy
	}

	useEffect(() => {
		if (!isEqual(prevItems, items)) {
			// dnd-kit keeps track of item order via an array of IDs, so build and store in state whenever
			// new set of items are passed in
			setItemOrder(items.map(item => item.id as string))
		}
	}, [items, prevItems])

	return (
		<div className={classes.container} id='dnd-container'>
			<DndContext
				collisionDetection={closestCenter}
				measuring={{
					draggable: {
						measure: element => {
							return {
								...getClientRect(element),
								left: getClientRect(element).left
							}
						}
					}
				}}
				modifiers={modifiers}
				onDragEnd={handleDragEnd}
				onDragStart={handleDragStart}
				sensors={sensors}
			>
				<SortableContext items={itemOrder} strategy={strategy}>
					{items.map((item: T, i) => [
						<DraggableItem
							disableDrag={disabled}
							id={item.id as string}
							key={i}
						>
							{renderItem(item, i, activeItemId === item.id)}
						</DraggableItem>,
						separator && i < items.length - 1 ? (
							<span key={`${i}-separator`}>{separator}</span>
						) : null
					])}
				</SortableContext>
				{/* DragOverlay holds whatever gets dragged around the screen */}
				{renderOverlay &&
					document.getElementById(dragOverlayContainerId) &&
					createPortal(
						<DragOverlay
							dropAnimation={{
								...defaultDropAnimation,
								...dropAnimationConfig
							}}
							modifiers={[restrictToParentElement]}
							zIndex={1200}
						>
							{activeItemId && (
								<ItemOverlay id={activeItemId}>
									{renderOverlay(
										items[itemOrder.indexOf(activeItemId)],
										itemOrder.indexOf(activeItemId)
									)}
								</ItemOverlay>
							)}
						</DragOverlay>,
						document.getElementById(dragOverlayContainerId)!
					)}
			</DndContext>
		</div>
	)
}

export * from './DraggableItem'
export { arrayMove }
export type { DragEndEvent, DragStartEvent, UniqueIdentifier }
