import { DroppableContainer } from '../FilterRenderer/DroppableContainer'
import { FilterCoordinator } from '../FilterCoordinator'
import { FilterCoordinators } from '../types'
import { FilterGroup } from './index'
import { useFilterGroupStyles } from '../styles'
import React, { FC } from 'react'

interface SubgroupProps {
	coordinator?: FilterCoordinators
	coordIsReadOnly?: boolean
	id: string
	parentGroupId: string
	showCoord?: boolean
}

export const Subgroup: FC<SubgroupProps> = ({
	coordinator,
	coordIsReadOnly = true,
	id,
	parentGroupId,
	showCoord
}: SubgroupProps) => {
	const classes = useFilterGroupStyles()

	return (
		<div className={classes.filterContainer}>
			{coordinator && showCoord && (
				<div className={classes.coordinator}>
					<FilterCoordinator
						coordinator={coordinator}
						groupId={parentGroupId}
						readOnly={coordIsReadOnly}
					/>
				</div>
			)}
			<DroppableContainer id={id}>
				<FilterGroup groupId={id} />
			</DroppableContainer>
		</div>
	)
}
