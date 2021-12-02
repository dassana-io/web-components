import {
	AnimatePresence,
	domAnimation,
	LazyMotion,
	m as motion
} from 'framer-motion'
import React, { FC, ReactNode } from 'react'

interface AnimateProps {
	children: ReactNode
	duration?: number
	isExpanded: boolean
}

export const Animate: FC<AnimateProps> = ({
	children,
	duration = 0.8,
	isExpanded
}: AnimateProps) => (
	<AnimatePresence initial={false}>
		{isExpanded && (
			<LazyMotion features={domAnimation}>
				<motion.section
					animate='open'
					exit='collapsed'
					initial='collapsed'
					transition={{
						duration,
						ease: [0.04, 0.62, 0.23, 0.98]
					}}
					variants={{
						collapsed: { height: 0, opacity: 0 },
						open: { height: 'auto', opacity: 1 }
					}}
				>
					{children}
				</motion.section>
			</LazyMotion>
		)}
	</AnimatePresence>
)
