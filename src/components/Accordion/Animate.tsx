import { BounceDirection } from 'components/ScrollableSection'
import {
	AnimatePresence,
	domAnimation,
	LazyMotion,
	m as motion
} from 'framer-motion'
import React, { type FC, type ReactNode } from 'react'

const getDimensionProperty = (direction: BounceDirection) =>
	direction === BounceDirection.vertical ? 'height' : 'width'

interface AnimateProps {
	children: ReactNode
	direction?: BounceDirection
	duration?: number
	isExpanded: boolean
}

export const Animate: FC<AnimateProps> = ({
	children,
	direction = BounceDirection.vertical,
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
						collapsed: {
							[getDimensionProperty(direction)]: 0,
							opacity: 0
						},
						open: {
							[getDimensionProperty(direction)]: 'auto',
							opacity: 1
						}
					}}
				>
					{children}
				</motion.section>
			</LazyMotion>
		)}
	</AnimatePresence>
)
