import cn from 'classnames'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FilterCoordinator } from './FilterCoordinator'
import { FilterUnit } from './Filter'
import { IconButton } from 'components/IconButton'
import { Link } from 'components/Link'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'
import { useFilterGroupStyles } from './styles'
import { useFiltersContext } from './FiltersContext'
import React, { FC, useCallback } from 'react'

interface FilterGroupProps {
	groupId: string
	showAddNewGroup?: boolean
}

export const FilterGroup: FC<FilterGroupProps> = ({
	groupId,
	showAddNewGroup = false
}: FilterGroupProps) => {
	const {
		addNewFilterGroup,
		addFilterToNewSubgroup,
		currentFilterId,
		currentGroupId,
		filtersMap,
		groupMap,
		deleteFilter,
		deleteGroup,
		setCurrentFilter,
		setCurrentGroup
	} = useFiltersContext()
	const {
		coordinator,
		filterIds,
		subgroupIds = [],
		parentGroupId
	} = groupMap[groupId]

	const classes = useFilterGroupStyles()

	const onGroupDelete = useCallback(
		() => deleteGroup(groupId),
		[deleteGroup, groupId]
	)

	return (
		<div
			className={cn({
				[classes.activeGroup]: groupId === currentGroupId,
				[classes.container]: true
			})}
			onClick={e => {
				groupId !== currentGroupId && setCurrentGroup(groupId)
				e.stopPropagation()
			}}
		>
			{filterIds.map((filterId, i) => {
				const filter = filtersMap[filterId]
				const canConvertToSubgroup =
					!parentGroupId &&
					(filterIds.length > 1 || subgroupIds.length > 0)

				return (
					<div className={classes.filterContainer} key={i}>
						{coordinator && filterIds.length > 1 && (
							<div
								className={cn({
									[classes.coordinator]: true,
									[classes.hide]: i === 0
								})}
							>
								<FilterCoordinator
									coordinator={coordinator}
									groupId={groupId}
									readOnly={i !== 1}
								/>
							</div>
						)}
						<FilterUnit
							active={filterId === currentFilterId}
							deleteFilter={deleteFilter}
							filter={mapValues(omit(filter, 'groupId'), filter =>
								filter.value.toLowerCase()
							)}
							id={filterId}
							key={i}
							onClick={setCurrentFilter}
							onClickOutside={() => setCurrentFilter('')}
							onConvertToSubgroup={
								canConvertToSubgroup
									? () =>
											addFilterToNewSubgroup(
												filterId,
												groupId
											)
									: undefined
							}
						/>
					</div>
				)
			})}
			{subgroupIds.length > 0 && (
				<div className={classes.subgroup}>
					{subgroupIds.map((subgroupId, i) => {
						let showCoord = true

						if (i === 0 && filterIds.length < 1) showCoord = false

						return (
							<div className={classes.filterContainer} key={i}>
								{coordinator && showCoord && (
									<div className={classes.coordinator}>
										<FilterCoordinator
											coordinator={coordinator}
											groupId={groupId}
											readOnly={
												i > (filterIds.length ? 0 : 1)
											}
										/>
									</div>
								)}
								<FilterGroup groupId={subgroupId} />
							</div>
						)
					})}
				</div>
			)}
			<IconButton
				classes={[classes.delete]}
				icon={faTimesCircle}
				onClick={onGroupDelete}
				size={10}
			/>
			{showAddNewGroup && (
				<Link classes={[classes.link]} onClick={addNewFilterGroup}>
					Add New Group
				</Link>
			)}
		</div>
	)
}
