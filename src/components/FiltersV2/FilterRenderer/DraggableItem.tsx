import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from '../../assets/styles'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import React, { FC, ReactNode } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		// padding: spacing.m
	}
})

interface DraggableItemProps {
	children: ReactNode
	classes?: string[]
	disableDrag?: boolean
	id: UniqueIdentifier
}

export const DraggableItem: FC<DraggableItemProps> = ({
	children,
	classes = [],
	disableDrag = false,
	id
}: DraggableItemProps) => {
	const { attributes, listeners, setNodeRef } = useSortable({
		disabled: disableDrag,
		id
	})
	const containerClasses = useStyles()

	return (
		<div
			className={cn({ [containerClasses.container]: true }, classes)}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
		>
			{children}
		</div>
	)
}
