import {
	ColorManipulationTypes,
	colorPalette,
	manipulateColor,
	styleguide,
	ThemeType
} from '../assets/styles'
import { getPriorityColor, GRID_ITEM_DIMENSION } from './utils'

const { light } = ThemeType

const {
	colors: { whites },
	flexCenter,
	fontWeight
} = styleguide

const getPartiallySelectedStyles = (color: string): string => {
	const crossHatchColor = manipulateColor(
		color,
		20,
		ColorManipulationTypes.tint
	)

	return `repeating-linear-gradient(
		45deg, 
		${color} 0px, 
		${color} 2px, 
		${crossHatchColor} 4px, 
		${crossHatchColor} 6px
	)
	`
}

export interface PriorityItemStyleProps {
	allSelected: boolean
	clickable?: boolean
	partiallySelected?: boolean
	rankingNum: number
	selected: boolean
}

export const commonPriorityItemStyles = {
	...flexCenter,
	background: ({
		partiallySelected,
		rankingNum,
		selected
	}: PriorityItemStyleProps) => {
		const color = getPriorityColor(rankingNum)

		return !selected && partiallySelected
			? getPartiallySelectedStyles(color)
			: color
	},
	border: `0.5px solid ${colorPalette[light].hoverBorderColor}`,
	color: whites.base,
	cursor: 'pointer',
	fontWeight: fontWeight.light,
	height: GRID_ITEM_DIMENSION,
	opacity: ({
		allSelected,
		selected,
		partiallySelected
	}: PriorityItemStyleProps) =>
		allSelected || selected || partiallySelected ? 1 : 0.3
}
