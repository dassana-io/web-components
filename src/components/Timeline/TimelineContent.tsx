import { TimelineState } from './types'
import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'

interface TimelineContentProps {
	children: ReactNode
	state?: TimelineState
	timestamp?: number
}

export const TimelineContent: FC<TimelineContentProps> = ({
	children,
	state = TimelineState.default
}: TimelineContentProps) => (
	<>
		<AnimatePresence initial={false}>
			{state === TimelineState.active && (
				<motion.section
					animate='open'
					exit='collapsed'
					initial='collapsed'
					transition={{
						duration: 0.8,
						ease: [0.04, 0.62, 0.23, 0.98]
					}}
					variants={{
						collapsed: { height: 0, opacity: 0 },
						open: { height: 'auto', opacity: 1 }
					}}
				>
					{children}
				</motion.section>
			)}
		</AnimatePresence>
		{state === TimelineState.uncollapsible && children}
	</>
)
