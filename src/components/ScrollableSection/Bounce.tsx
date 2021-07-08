import cn from 'classnames'
import { motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'

export enum BounceDirection {
	vertical = 'vertical',
	horizontal = 'horizontal'
}

const { horizontal, vertical } = BounceDirection

interface BounceProps {
	children: ReactNode
	classes?: string[]
	direction?: BounceDirection
	distance?: number
}

export const Bounce: FC<BounceProps> = ({
	children,
	classes = [],
	direction = vertical,
	distance = 8
}: BounceProps) => (
	<motion.div
		className={cn(classes)}
		whileHover={{
			transition: {
				duration: 0.4,
				ease: 'easeInOut',
				repeat: Infinity,
				repeatType: 'reverse'
			},
			x: direction === horizontal ? distance : 0,
			y: direction === vertical ? distance : 0
		}}
	>
		{children}
	</motion.div>
)
