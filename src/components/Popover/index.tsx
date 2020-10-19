import '../assets/styles/antdAnimations.css'
import 'antd/lib/popover/style/index.css'
import { Popover as AntDPopover } from 'antd'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generatePopoverStyles } from './utils'
import { ThemeType } from '../assets/styles/themes'
import { TooltipPlacement } from 'antd/es/tooltip'
import { getDataTestAttributeProp, getPopupContainerCreator } from '../utils'
import React, { FC, ReactNode } from 'react'

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
	 * Selector of HTML element inside which to render the popup
	 */
	popupContainerSelector?: string
	/**
	 * Position of popover relative to the target
	 */
	placement?: TooltipPlacement
	/**
	 * Title of popover
	 */
	title?: PopoverContent
}

export const Popover: FC<PopoverProps> = ({
	children,
	classes = [],
	content,
	dataTag,
	placement = 'bottom',
	popupContainerSelector,
	title
}: PopoverProps) => {
	useStyles()

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: getPopupContainerCreator(popupContainerSelector)
		}
	}

	return (
		<AntDPopover
			content={content}
			overlayClassName={cn(classes)}
			placement={placement}
			title={title}
			{...popupContainerProps}
		>
			<span {...getDataTestAttributeProp('popover-trigger', dataTag)}>
				{children}
			</span>
		</AntDPopover>
	)
}
