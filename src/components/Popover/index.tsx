import '../assets/styles/antdAnimations.css'
import 'antd/lib/popover/style/index.css'
import { Popover as AntDPopover } from 'antd'
import cn from 'classnames'
import { type CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generatePopoverStyles } from './utils'
import { ThemeType } from '../assets/styles/themes'
import { type TooltipPlacement } from 'antd/es/tooltip'
import { getDataTestAttributeProp, getPopupContainerProps } from '../utils'
import React, { type FC, type ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		[`.${dark}`]: {
			'& $div': generatePopoverStyles(dark)
		},
		div: generatePopoverStyles(light)
	}
})

export type PopoverContent = string | ReactNode

export interface PopoverProps extends CommonComponentProps {
	/**
	 * Element popover should be anchored to
	 */
	children: ReactNode
	/**
	 * Array of classes to pass to element
	 * @default []
	 */
	classes?: string[]
	/**
	 * Content rendered inside of popover
	 */
	content: PopoverContent
	/**
	 * Callback that runs when visibility of popover changes
	 */
	onVisibleChange?: (visible: boolean) => void
	/**
	 * Selector of HTML element inside which to render the popup
	 */
	popupContainerSelector?: string
	popupTriggerClasses?: string[]
	/**
	 * Position of popover relative to the target
	 */
	placement?: TooltipPlacement
	/**
	 * Title of popover
	 */
	title?: PopoverContent
	/**
	 * Action type that will trigger the popover to open
	 */
	trigger?: 'hover' | 'click'
	/**
	 * Controlled open/close state of popover
	 */
	visible?: boolean
}

export const Popover: FC<PopoverProps> = ({
	children,
	classes = [],
	content,
	dataTag,
	onVisibleChange,
	placement = 'bottom',
	popupContainerSelector,
	popupTriggerClasses = [],
	title,
	trigger = 'click',
	visible
}: PopoverProps) => {
	useStyles()

	let controlledCmpProps = {}

	if (onVisibleChange) {
		controlledCmpProps = { onOpenChange: onVisibleChange, open: visible }
	}

	if (visible && !onVisibleChange) {
		throw new Error('Controlled Popover requires an onVisibleChange prop')
	}

	return (
		<AntDPopover
			content={content}
			destroyTooltipOnHide
			overlayClassName={cn(classes)}
			placement={placement}
			title={title}
			trigger={trigger}
			{...controlledCmpProps}
			{...getPopupContainerProps(popupContainerSelector)}
		>
			<span
				className={cn(popupTriggerClasses)}
				{...getDataTestAttributeProp('popover-trigger', dataTag)}
			>
				{children}
			</span>
		</AntDPopover>
	)
}
