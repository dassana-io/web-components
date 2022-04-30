import cn from 'classnames'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FilterSection } from './FilterSection'
import { getFiltersAndSubgroups } from '../utils'
import { IconButton } from 'components/IconButton'
import { Link } from 'components/Link'
import { Subgroup } from './Subgroup'
import { useFilterGroupStyles } from '../styles'
import { useFiltersContext } from '../FiltersContext'
import React, { FC, useCallback } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

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
		currentGroupId,
		groupMap,
		deleteGroup,
		setCurrentGroup
	} = useFiltersContext()
	const { coordinator, items, parentGroupId } = groupMap[groupId]

	const { filterIds, subgroupIds } = getFiltersAndSubgroups(items)

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
			<SortableContext
				items={items.map(({ id }) => id)}
				strategy={verticalListSortingStrategy}
			>
				{items.map(({ id, subgroup }, i) => {
					const commonCmpProps = {
						coordIsReadOnly: i !== 1,
						coordinator,
						id,
						parentGroupId: parentGroupId ? parentGroupId : groupId,
						showCoord: i > 0
					}

					return subgroup ? (
						<Subgroup {...commonCmpProps} />
					) : (
						<FilterSection
							{...commonCmpProps}
							canConvertToSubgroup={
								!parentGroupId &&
								(filterIds.length > 1 || subgroupIds.length > 0)
							}
						/>
					)
				})}
			</SortableContext>
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
