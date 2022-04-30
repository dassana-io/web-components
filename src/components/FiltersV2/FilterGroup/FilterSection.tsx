import cn from 'classnames'
import { convertFilterConfigToFilterUnit } from '../utils'
import { DroppableContainer } from '../FilterRenderer/DroppableContainer'
import { FilterCoordinator } from '../FilterCoordinator'
import { FilterCoordinators } from '../types'
import { FilterUnit } from '../Filter'
import { useFilterGroupStyles } from '../styles'
import { useFiltersContext } from '../FiltersContext'
import React, { FC, useMemo } from 'react'

interface FilterSectionProps {
	canConvertToSubgroup?: boolean
	coordinator?: FilterCoordinators
	coordIsReadOnly?: boolean
	id: string
	parentGroupId: string
	showCoord?: boolean
}

export const FilterSection: FC<FilterSectionProps> = ({
	canConvertToSubgroup = false,
	coordinator,
	coordIsReadOnly = false,
	id,
	parentGroupId,
	showCoord = false
}: FilterSectionProps) => {
	const {
		addFilterToNewSubgroup,
		currentFilterId,
		draggingFilterId,
		filtersMap,
		deleteFilter,
		setCurrentFilter
	} = useFiltersContext()
	const classes = useFilterGroupStyles()

	const filter = useMemo(() => filtersMap[id], [filtersMap, id])

	const renderFilter = () => (
		<FilterUnit
			active={id === currentFilterId}
			deleteFilter={deleteFilter}
			filter={convertFilterConfigToFilterUnit(filter)}
			id={id}
			isDragging={id === draggingFilterId}
			onClick={setCurrentFilter}
			onClickOutside={() => setCurrentFilter('')}
			onConvertToSubgroup={
				canConvertToSubgroup
					? () => addFilterToNewSubgroup(id, parentGroupId)
					: undefined
			}
		/>
	)

	return (
		<div className={classes.filterContainer}>
			{coordinator && showCoord && (
				<div
					className={cn({
						[classes.coordinator]: true,
						[classes.hide]: !showCoord
					})}
				>
					<FilterCoordinator
						coordinator={coordinator}
						groupId={parentGroupId}
						readOnly={coordIsReadOnly}
					/>
				</div>
			)}
			{canConvertToSubgroup ? (
				<DroppableContainer id={id}>
					{renderFilter()}
				</DroppableContainer>
			) : (
				renderFilter()
			)}
		</div>
	)
}
