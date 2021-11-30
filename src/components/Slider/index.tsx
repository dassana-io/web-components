import 'antd/lib/slider/style/index.css'
import { Slider as AntDSlider } from 'antd'
import { SliderMarks } from 'antd/lib/slider'
import { useSliderStyles } from './styles'
import React, { FC, ReactNode } from 'react'

export interface SliderProps {
	alwaysShowTooltip?: boolean
	defaultValue?: number
	disabled?: boolean
	min?: number
	max?: number
	onAfterChange: (value: number) => void
	tickFormatter?: (val?: number) => ReactNode
	ticks?: SliderMarks
}

export const Slider: FC<SliderProps> = ({
	alwaysShowTooltip = false,
	defaultValue = 0,
	disabled = false,
	min = 0,
	max = 100,
	onAfterChange,
	tickFormatter,
	ticks
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
			tooltipVisible={alwaysShowTooltip}
		/>
	)
}

export type { SliderMarks }
