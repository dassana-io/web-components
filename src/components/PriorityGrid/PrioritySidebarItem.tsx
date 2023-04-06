import { createUseStyles } from 'react-jss'
import { colorPalette, styleguide, ThemeType } from '../assets/styles'
import { commonPriorityItemStyles, PriorityItemStyleProps } from './styles'
import { GRID_ITEM_DIMENSION, TOTAL_NUM_OF_PRIORITIES } from './utils'
import React, { FC, useCallback } from 'react'

const { dark } = ThemeType

const { spacing } = styleguide

const useStyles = createUseStyles({
	prioritySidebarItem: {
		...commonPriorityItemStyles,
		fontSize: ({ rankingNum }: PriorityItemStyleProps) =>
			`${100 - (rankingNum / TOTAL_NUM_OF_PRIORITIES) * 100}%`,
		padding: spacing.s,
		width: ({ rankingNum }: PriorityItemStyleProps) =>
			GRID_ITEM_DIMENSION -
			(rankingNum / TOTAL_NUM_OF_PRIORITIES) * GRID_ITEM_DIMENSION
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $prioritySidebarItem': {
				border: `0.5px solid ${colorPalette[dark].hoverBorderColor}`
			}
		}
	}
})

interface PrioritySidebarItemProps {
	allSelected: boolean
	onItemClick: (rankingNum: number) => void
	partiallySelected?: boolean
	selected: boolean
	rankingNum: number
}

export const PrioritySidebarItem: FC<PrioritySidebarItemProps> = ({
	allSelected,
	onItemClick,
	partiallySelected = false,
	selected,
	rankingNum
}: PrioritySidebarItemProps) => {
	const classes = useStyles({
		allSelected,
		partiallySelected,
		rankingNum,
		selected
	})

	const handleItemClick = useCallback(
		() => onItemClick(rankingNum),
		[onItemClick, rankingNum]
	)

	return (
		<div className={classes.prioritySidebarItem} onClick={handleItemClick}>
			{`P${rankingNum}`}
		</div>
	)
}
