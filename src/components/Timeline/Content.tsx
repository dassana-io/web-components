import { Animate } from '../Accordion/Animate'
import { TimelineState } from './types'
import React, { FC, ReactNode } from 'react'

interface ContentProps {
	children: ReactNode
	state?: TimelineState
}

export const Content: FC<ContentProps> = ({
	children,
	state = TimelineState.collapsed
}: ContentProps) => (
	<>
		<Animate isExpanded={state === TimelineState.expanded}>
			{children}
		</Animate>
		{state === TimelineState.alwaysExpanded && children}
	</>
)
