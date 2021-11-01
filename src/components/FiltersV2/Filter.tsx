import { FilterUnit as FilterUnitType } from './types'
import { IconButton } from 'components/IconButton'
import { Tooltip } from 'components/Tooltip'
import { useBaseFilterStyles } from './styles'
import { faLayerPlus, faTimesCircle } from '@fortawesome/pro-light-svg-icons'
import React, { FC, useCallback } from 'react'

export interface FilterUnitProps {
	deleteFilter: (id: string) => void
	filter: FilterUnitType
	id: string
	onDrag?: () => void // TODO: make this required
	onConvertToSubgroup?: () => void
}

export const FilterUnit: FC<FilterUnitProps> = ({
	deleteFilter,
	filter,
	id,
	onConvertToSubgroup
}: FilterUnitProps) => {
	const { key, operator, value } = filter

	const classes = useBaseFilterStyles()

	const onDeleteClick = useCallback(() => {
		deleteFilter(id)
	}, [deleteFilter, id])

	return (
		<div className={classes.container}>
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
						onClick={onConvertToSubgroup}
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
