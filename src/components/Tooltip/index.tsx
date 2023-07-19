import '../assets/styles/antdAnimations.css'
import 'antd/lib/tooltip/style/index.css'
import { Tooltip as AntDTooltip } from 'antd'
import cn from 'classnames'
import { type CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateTooltipStyles } from './utils'
import { ThemeType } from '../assets/styles/themes'
import { type TooltipPlacement } from 'antd/es/tooltip'
import { getDataTestAttributeProp, getPopupContainerProps } from '../utils'
import React, { type FC, type ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		[`.${dark}`]: {
			'& $div': generateTooltipStyles(dark)
		},
		div: generateTooltipStyles(light)
	}
})

export type TooltipTitle = string | ReactNode

export type TooltipTriggerMode = 'hover' | 'focus' | 'click'

export interface TooltipProps extends CommonComponentProps {
	/**
	 * Element tooltip should be anchored to
	 */
	children: ReactNode
	/**
	 * Array of classes to pass to element
	 * @default []
	 */
	classes?: string[]
	/**
	 * Position of tooltip relative to the target
	 */
	placement?: TooltipPlacement
	/**
	 * Selector of HTML element inside which to render the popup
	 */
	popupContainerSelector?: string
	/** Renders without a wrapping span */
	renderWithoutDataTag?: boolean
	/**
	 * Text shown in the tooltip
	 */
	title: TooltipTitle
	tooltipTriggerClasses?: string[]
	/**
	 * Action type that will trigger the tooltip to open
	 */
	triggerMode?: TooltipTriggerMode | TooltipTriggerMode[]
}

export const Tooltip: FC<TooltipProps> = ({
	children,
	classes = [],
	dataTag,
	placement = 'right',
	popupContainerSelector,
	renderWithoutDataTag = false,
	title,
	tooltipTriggerClasses = [],
	triggerMode = 'hover'
}: TooltipProps) => {
	useStyles()

	return (
		<AntDTooltip
			overlayClassName={cn(classes)}
			overlayStyle={{ borderRadius: 4 }}
			placement={placement}
			title={title}
			trigger={triggerMode}
			{...getPopupContainerProps(popupContainerSelector)}
		>
			{renderWithoutDataTag
? (
				children
			)
: (
				<span
					className={cn(tooltipTriggerClasses)}
					{...getDataTestAttributeProp('tooltip-trigger', dataTag)}
				>
					{children}
				</span>
			)}
		</AntDTooltip>
	)
}
