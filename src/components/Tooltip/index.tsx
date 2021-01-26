import '../assets/styles/antdAnimations.css'
import 'antd/lib/tooltip/style/index.css'
import { Tooltip as AntDTooltip } from 'antd'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateTooltipStyles } from './utils'
import { ThemeType } from '../assets/styles/themes'
import { TooltipPlacement } from 'antd/es/tooltip'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'
import React, { FC, ReactNode } from 'react'

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
}

export const Tooltip: FC<TooltipProps> = ({
	children,
	classes = [],
	dataTag,
	placement = 'right',
	popupContainerSelector,
	renderWithoutDataTag = false,
	title,
	tooltipTriggerClasses = []
}: TooltipProps) => {
	useStyles()

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	return (
		<AntDTooltip
			overlayClassName={cn(classes)}
			overlayStyle={{ borderRadius: 4 }}
			placement={placement}
			title={title}
			{...popupContainerProps}
		>
			{renderWithoutDataTag ? (
				children
			) : (
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
