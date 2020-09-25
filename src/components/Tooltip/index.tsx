import '../assets/styles/antdAnimations.css'
import 'antd/lib/tooltip/style/index.css'
import { Tooltip as AntDTooltip } from 'antd'
import cn from 'classnames'
import { TooltipPlacement } from 'antd/es/tooltip'
import React, { FC, ReactNode } from 'react'

export type TooltipTitle = string | ReactNode

export interface TooltipProps {
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
	 * Text shown in the tooltip
	 */
	title: TooltipTitle
}

const Tooltip: FC<TooltipProps> = ({
	children,
	classes = [],
	placement = 'right',
	title
}: TooltipProps) => {
	return (
		<AntDTooltip
			overlayClassName={cn(classes)}
			overlayStyle={{ borderRadius: 4 }}
			placement={placement}
			title={title}
		>
			<span>{children}</span>
		</AntDTooltip>
	)
}

export default Tooltip
