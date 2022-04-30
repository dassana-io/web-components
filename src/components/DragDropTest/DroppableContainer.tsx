import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import React, { FC, ReactNode } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		border: '1px solid blue',
		padding: spacing.m
	}
})

interface DroppableContainerProps {
	children: ReactNode
	// dragging: boolean
	id: UniqueIdentifier
}

export const DroppableContainer: FC<DroppableContainerProps> = ({
	children,
	id
}: DroppableContainerProps) => {
	const classes = useStyles()
	const { setNodeRef } = useSortable({ data: { type: 'container' }, id })

	return (
		<div className={classes.container} ref={setNodeRef}>
			{children}
		</div>
	)
}
