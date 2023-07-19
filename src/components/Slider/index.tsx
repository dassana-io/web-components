import 'antd/lib/slider/style/index.css'
import { Slider as AntDSlider } from 'antd'
import { type SliderMarks } from 'antd/lib/slider'
import { type TooltipPlacement } from 'antd/es/tooltip'
import { useSliderStyles } from './styles'
import React, { type FC, type ReactNode } from 'react'

export interface SliderProps {
	alwaysShowTooltip?: boolean
	defaultValue?: number
	disabled?: boolean
	min?: number
	max?: number
	onAfterChange: (value: number) => void
	tickFormatter?: (val?: number) => ReactNode
	ticks?: SliderMarks
	tooltipPlacement?: TooltipPlacement
}

export const Slider: FC<SliderProps> = ({
	alwaysShowTooltip = false,
	defaultValue = 0,
	disabled = false,
	min = 0,
	max = 100,
	onAfterChange,
	tickFormatter,
	ticks,
	tooltipPlacement
}: SliderProps) => {
	const classes = useSliderStyles()

	return (
		<AntDSlider
			className={classes.slider}
			defaultValue={defaultValue}
			disabled={disabled}
			marks={ticks}
			max={max}
			min={min}
			onAfterChange={onAfterChange}
			tipFormatter={tickFormatter}
			tooltipPlacement={tooltipPlacement}
			tooltipVisible={alwaysShowTooltip}
		/>
	)
}

export type { SliderMarks }
