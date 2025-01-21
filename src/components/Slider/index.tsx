import 'antd/lib/slider/style/index.css'
import { Slider as AntDSlider } from 'antd'
import { type SliderMarks } from 'antd/lib/slider'
import { styleguide } from 'components/assets/styles'
import { type TooltipPlacement } from 'antd/es/tooltip'
import { useSliderStyles } from './styles'
import React, { type FC, type ReactNode, useState } from 'react'

const { flexAlignCenter, spacing } = styleguide

export interface SliderProps {
	alwaysShowTooltip?: boolean
	defaultValue?: number
	disabled?: boolean
	min?: number
	max?: number
	onAfterChange: (value: number) => void
	showMinMax?: boolean
	showTooltipOnHover?: boolean
	step?: number
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
	showMinMax = false,
	showTooltipOnHover = false,
	step = 1,
	tickFormatter,
	ticks,
	tooltipPlacement
}: SliderProps) => {
	const classes = useSliderStyles()

	const [isHovered, setIsHovered] = useState(false)

	const baseSlider = (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ width: '100%' }}
		>
			<AntDSlider
				className={classes.slider}
				defaultValue={defaultValue}
				disabled={disabled}
				marks={ticks}
				max={max}
				min={min}
				onAfterChange={onAfterChange}
				step={step}
				tipFormatter={tickFormatter}
				tooltip={{
					// formatter: tickFormatter,
					open:
						alwaysShowTooltip || (showTooltipOnHover && isHovered),
					placement: tooltipPlacement
				}}
			/>
		</div>
	)

	if (showMinMax) {
		return (
			<div style={{ ...flexAlignCenter }}>
				<div
					className={classes.minMaxLabel}
					style={{ marginRight: spacing['s+'] }}
				>
					{min}
				</div>

				{baseSlider}

				<div
					className={classes.minMaxLabel}
					style={{ marginLeft: spacing.s }}
				>
					{max}
				</div>
			</div>
		)
	}

	return baseSlider
}

export type { SliderMarks }
