import { abbreviateNumber } from '@dassana-io/web-utils'
import { createUseStyles } from 'react-jss'
import { GRID_ITEM_DIMENSION } from './utils'
import { colorPalette, ThemeType } from '../assets/styles'
import { commonPriorityItemStyles, PriorityItemStyleProps } from './styles'
import React, { FC, useCallback } from 'react'

const { dark } = ThemeType

const useStyles = createUseStyles({
	priorityItem: {
		...commonPriorityItemStyles,
		cursor: ({ clickable }: PriorityItemStyleProps) =>
			clickable ? 'pointer' : 'default',
		width: GRID_ITEM_DIMENSION,
		// eslint-disable-next-line sort-keys
		'@global': {
			[`.${dark}`]: {
				'& $prioritySidebarItem': {
					border: `0.5px solid ${colorPalette[dark].hoverBorderColor}`
				}
			}
		}
	}
})

interface PriorityItemProps {
	allSelected: boolean
	count?: number
	criticality: number
	onClick?: (criticality: number, severity: number) => void
	partiallySelected?: boolean
	selected: boolean
	severity: number
}

export const PriorityItem: FC<PriorityItemProps> = ({
	allSelected,
	count,
	criticality,
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
			{typeof count === 'number' && abbreviateNumber(count)}
		</div>
	)
}
