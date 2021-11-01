import cn from 'classnames'
import { FilterUnit as FilterUnitType } from './types'
import { IconButton } from 'components/IconButton'
import { Tooltip } from 'components/Tooltip'
import { useBaseFilterStyles } from './styles'
import { useClickOutside } from '@dassana-io/web-utils'
import { faLayerPlus, faTimesCircle } from '@fortawesome/pro-light-svg-icons'
import React, { FC, useCallback } from 'react'

export interface FilterUnitProps {
	active?: boolean
	deleteFilter: (id: string) => void
	filter: FilterUnitType
	id: string
	onClick: (id: string) => void
	onClickOutside: () => void
	onDrag?: () => void // TODO: make this required
	onConvertToSubgroup?: () => void
}

export const FilterUnit: FC<FilterUnitProps> = ({
	active = false,
	deleteFilter,
	filter,
	id,
	onClick,
	onClickOutside,
	onConvertToSubgroup
}: FilterUnitProps) => {
	const filterRef = useClickOutside({
		callback: () => active && onClickOutside()
	})
	const { key, operator, value } = filter

	const classes = useBaseFilterStyles()

	const onConvertToSubgroupClick = useCallback(() => {
		if (active) onClickOutside()

		onConvertToSubgroup && onConvertToSubgroup()
	}, [active, onClickOutside, onConvertToSubgroup])

	const onDeleteClick = useCallback(() => {
		if (active) onClickOutside()

		deleteFilter(id)
	}, [active, deleteFilter, id, onClickOutside])

	const onFilterClick = useCallback(() => {
		onClick(id)
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
			<div>
				{/* <FontAwesomeIcon
					className={classes.dragHandle}
					icon={faGripVertical}
				/> */}
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
