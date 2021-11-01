import cn from 'classnames'
import { FilterCoordinator } from './FilterCoordinator'
import { FilterGroup } from './FilterGroup'
import omitBy from 'lodash/omitBy'
import { useFilterGroupStyles } from './styles'
import { useFiltersContext } from './FiltersContext'
import React, { useMemo } from 'react'

export const FilterRenderer = () => {
	const { groupMap, numFilters, primaryCoordinator } = useFiltersContext()

	const classes = useFilterGroupStyles()

	const firstLevelFilterGroupIds = useMemo(
		() => Object.keys(omitBy(groupMap, group => group.parentGroupId)),
		[groupMap]
	)

	return (
		<div className={classes.rendererContainer}>
			{numFilters > 0 &&
				firstLevelFilterGroupIds.map((groupId, i) => (
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
						<FilterGroup
							groupId={groupId}
							showAddNewGroup={
								i === firstLevelFilterGroupIds.length - 1
							}
						/>
					</div>
				))}
		</div>
	)
}
