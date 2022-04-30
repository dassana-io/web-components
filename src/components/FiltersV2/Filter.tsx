import cn from 'classnames'
import { DraggableItem } from './FilterRenderer/DraggableItem'
import { FilterUnit as FilterUnitType } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from 'components/IconButton'
import { Tooltip } from 'components/Tooltip'
import { useBaseFilterStyles } from './styles'
import { useClickOutside } from '@dassana-io/web-utils'
import {
	faGripVertical,
	faLayerPlus,
	faTimesCircle
} from '@fortawesome/pro-light-svg-icons'
import React, { FC, useCallback } from 'react'

interface FilterUnitProps {
	active?: boolean
	deleteFilter?: (id: string) => void
	filter: FilterUnitType
	id: string
	isDragging?: boolean
	onClick?: (id: string) => void
	onClickOutside?: () => void
	onDrag?: () => void // TODO: make this required
	onConvertToSubgroup?: () => void
	readOnly?: boolean
}

export const FilterUnit: FC<FilterUnitProps> = ({
	active = false,
	deleteFilter,
	filter,
	id,
	isDragging = false,
	onClick,
	onClickOutside,
	onConvertToSubgroup,
	readOnly
}: FilterUnitProps) => {
	const filterRef = useClickOutside({
		callback: () => active && onClickOutside && onClickOutside()
	})
	const { key, operator, value } = filter

	const classes = useBaseFilterStyles({ isDragging, readOnly })

	const onConvertToSubgroupClick = useCallback(() => {
		if (active && onClickOutside) onClickOutside()

		onConvertToSubgroup && onConvertToSubgroup()
	}, [active, onClickOutside, onConvertToSubgroup])

	const onDeleteClick = useCallback(() => {
		if (active && onClickOutside) onClickOutside()

		deleteFilter && deleteFilter(id)
	}, [active, deleteFilter, id, onClickOutside])

	const onFilterClick = useCallback(() => {
		onClick && onClick(id)
	}, [id, onClick])

	return (
		<div
			className={cn({
				[classes.active]: active,
				[classes.container]: true
			})}
			onClick={onFilterClick}
			ref={filterRef}
		>
			{readOnly ? (
				<FontAwesomeIcon
					className={classes.dragHandle}
					icon={faGripVertical}
				/>
			) : (
				<DraggableItem classes={[classes.dragHandle]} id={id}>
					<FontAwesomeIcon icon={faGripVertical} />
				</DraggableItem>
			)}

			<div>
				<span>{key}</span>
				<span className={classes.operator}>{operator}</span>
				<span>{value}</span>
			</div>
			{onConvertToSubgroup && (
				<Tooltip
					placement='top'
					title='Convert to subgroup'
					tooltipTriggerClasses={[classes.iconButton]}
				>
					<IconButton
						icon={faLayerPlus}
						onClick={onConvertToSubgroupClick}
					/>
				</Tooltip>
			)}
			<Tooltip
				placement='top'
				title='Delete filter'
				tooltipTriggerClasses={[classes.iconButton]}
			>
				<IconButton icon={faTimesCircle} onClick={onDeleteClick} />
			</Tooltip>
		</div>
	)
}
