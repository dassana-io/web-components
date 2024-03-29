import { Animate } from './Animate'
import React, { type FC, type ReactNode } from 'react'

interface PanelContentProps {
	children: ReactNode
	isExpanded: boolean
}

export const PanelContent: FC<PanelContentProps> = ({
	children,
	isExpanded
}: PanelContentProps) => <Animate isExpanded={isExpanded}>{children}</Animate>
