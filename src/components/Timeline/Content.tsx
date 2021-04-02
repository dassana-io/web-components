import { Animate } from '../Accordion/Animate'
import { TimelineState } from './types'
import React, { FC, ReactNode } from 'react'

const { alwaysExpanded, collapsed, expanded } = TimelineState

interface ContentProps {
	children: ReactNode
	state?: TimelineState
}

export const Content: FC<ContentProps> = ({
	children,
	state = collapsed
}: ContentProps) => (
	<>
		<Animate isExpanded={state === expanded}>{children}</Animate>
		{state === alwaysExpanded && children}
	</>
)
