import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from '../../assets/styles'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useFiltersContext } from '../FiltersContext'
import { useSortable } from '@dnd-kit/sortable'
import React, { FC, ReactNode } from 'react'

const {
	borderRadius,
	colors: { blacks }
} = styleguide

const useStyles = createUseStyles({
	active: {
		border: `1px dashed ${blacks['lighten-30']}`,
		borderRadius,
		opacity: 0.5
	}
})

interface DroppableContainerProps {
	children: ReactNode
	classes?: string[]
	id: UniqueIdentifier
}

export const DroppableContainer: FC<DroppableContainerProps> = ({
	children,
	classes = [],
	id
}: DroppableContainerProps) => {
	const { setNodeRef } = useSortable({
		data: { type: 'container' },
		id
	})
	const { draggingFilterId, lastDragOverId } = useFiltersContext()

	const containerClasses = useStyles()

	return (
		<div
			className={cn(
				{
					[containerClasses.active]:
						draggingFilterId && lastDragOverId.current === id
				},
				classes
			)}
			ref={setNodeRef}
		>
			{children}
		</div>
	)
}
