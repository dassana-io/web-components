import cn from 'classnames'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import React, { type FC, type ReactNode } from 'react'

interface DraggableItemProps {
	children: ReactNode
	classes?: string[]
	disableDrag?: boolean
	id: string
}

const DraggableItem: FC<DraggableItemProps> = ({
	children,
	classes = [],
	disableDrag = false,
	id
}: DraggableItemProps) => {
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useSortable({ disabled: disableDrag, id })

	const style = {
		cursor: isDragging ? 'grabbing' : disableDrag ? 'default' : 'grab',
		transform: CSS.Transform.toString(transform) ?? ''
	}

	return (
		<div
			className={cn(classes)}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{children}
		</div>
	)
}

export default DraggableItem
