import { abbreviateNumber } from '@dassana-io/web-utils'
import { createUseStyles } from 'react-jss'
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons'
import { GRID_ITEM_DIMENSION } from './utils'
import { IconButton } from 'components/IconButton'
import noop from 'lodash/noop'
import { commonPriorityItemStyles, PriorityItemStyleProps } from './styles'
import React, { FC, useCallback } from 'react'

const useStyles = createUseStyles({
	count: {
		transform: 'rotate(45deg)'
	},
	priorityItem: {
		...commonPriorityItemStyles,
		cursor: ({ clickable }: PriorityItemStyleProps) =>
			clickable ? 'pointer' : 'default',
		width: GRID_ITEM_DIMENSION
	}
})

const getCount = (count: number): string =>
	count > 0 ? abbreviateNumber(count) : '-'

interface PriorityItemProps {
	allSelected: boolean
	count?: number
	criticality: number
	loading?: boolean
	onClick?: (criticality: number, severity: number) => void
	partiallySelected?: boolean
	selected: boolean
	severity: number
}

export const PriorityItem: FC<PriorityItemProps> = ({
	allSelected,
	count,
	criticality,
	loading = false,
	onClick,
	partiallySelected = false,
	selected,
	severity
}: PriorityItemProps) => {
	const rankingNum = criticality + severity

	const classes = useStyles({
		allSelected,
		clickable: !!onClick,
		partiallySelected,
		rankingNum,
		selected
	})

	const handleItemClick = useCallback(
		() => onClick && onClick(criticality, severity),
		[criticality, onClick, severity]
	)

	return (
		<div className={classes.priorityItem} onClick={handleItemClick}>
			<span className={classes.count}>
				{loading && (
					<IconButton icon={faCircleNotch} onClick={noop} pending />
				)}
				{!loading && typeof count === 'number' && getCount(count)}
			</span>
		</div>
	)
}
