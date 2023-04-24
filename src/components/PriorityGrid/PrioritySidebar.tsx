import { ReactComponent as ArrowLong } from '../assets/images/arrow_long.svg'
import { createUseStyles } from 'react-jss'
import { PrioritySidebarItem } from './PrioritySidebarItem'
import { styleguide } from '../assets/styles/styleguide'
import {
	allItemsInFirstArrExistInSecondArr,
	findCommonItemsInArrays,
	GRID_ITEM_DIMENSION,
	GridMap,
	PriorityColorMap
} from './utils'
import React, { FC } from 'react'

const { flexAlignCenter, flexDown, font, fontWeight, spacing } = styleguide

const useStyles = createUseStyles({
	arrowContainer: {
		padding: {
			left: spacing.xs,
			right: spacing['s+']
		}
	},
	label: {
		...font.body,
		fontWeight: fontWeight.light,
		paddingLeft: spacing.m,
		writingMode: 'vertical-rl'
	},
	prioritySidebar: {
		...flexDown
	},
	prioritySidebarContainer: {
		...flexAlignCenter
	},
	prioritySidebarItem: {
		width: GRID_ITEM_DIMENSION
	}
})

interface PrioritySidebarProps {
	allSelected: boolean
	gridMap: GridMap
	onSidebarItemClick: (priorityNum: number) => void
	selectedGridItems: string[]
	showLabel?: boolean
}

export const PrioritySidebar: FC<PrioritySidebarProps> = ({
	allSelected,
	gridMap,
	onSidebarItemClick,
	selectedGridItems,
	showLabel = true
}: PrioritySidebarProps) => {
	const classes = useStyles()

	return (
		<div className={classes.prioritySidebarContainer}>
			{showLabel && <div className={classes.label}>Priority</div>}
			<div className={classes.arrowContainer}>
				<ArrowLong />
			</div>
			<div className={classes.prioritySidebar}>
				{Object.keys(PriorityColorMap).map(ranking => (
					<PrioritySidebarItem
						allSelected={allSelected}
						key={`p${ranking}`}
						onItemClick={onSidebarItemClick}
						partiallySelected={
							findCommonItemsInArrays(
								gridMap[`p${ranking}`],
								selectedGridItems
							).length > 0
						}
						rankingNum={Number(ranking)}
						selected={allItemsInFirstArrExistInSecondArr(
							gridMap[`p${ranking}`],
							selectedGridItems
						)}
					/>
				))}
			</div>
		</div>
	)
}
