import '../assets/styles/antdAnimations.css'
import 'antd/lib/tooltip/style/index.css'
// import 'antd/dist/antd.css'
import { Tooltip as AntDTooltip } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'
import React, { FC, ReactNode } from 'react'

export type TooltipTitle = string | ReactNode

export interface TooltipProps {
	/**
	 * Element tooltip should be anchored to
	 */
	children: ReactNode
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
	placement = 'right',
	title
}: TooltipProps) => {
	return (
		<AntDTooltip
			overlayStyle={{ borderRadius: 4 }}
			placement={placement}
			title={title}
		>
			<span>{children}</span>
		</AntDTooltip>
	)
}

export default Tooltip
