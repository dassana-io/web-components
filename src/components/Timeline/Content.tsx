import { Animate } from '../Accordion/Animate'
import { TimelineState } from './types'
import React, { FC, ReactNode } from 'react'

const { alwaysExpanded, collapsed, expanded } = TimelineState

interface ContentProps {
	children: ReactNode
	onClick?: () => void
	state?: TimelineState
}

export const Content: FC<ContentProps> = ({
	children,
	onClick,
	state = collapsed
}: ContentProps) => (
	<>
		<Animate isExpanded={state === expanded}>
			<div onClick={onClick}>{children}</div>
		</Animate>
		{state === alwaysExpanded && <div onClick={onClick}>{children}</div>}
	</>
)
