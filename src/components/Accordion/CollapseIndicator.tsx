import { faChevronDown } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { domAnimation, LazyMotion, m as motion } from 'framer-motion'
import React, { type FC } from 'react'

interface CollapseIndicatorProps {
	isCollapsed: boolean
}

export const CollapseIndicator: FC<CollapseIndicatorProps> = ({
	isCollapsed
}: CollapseIndicatorProps) => (
	<LazyMotion features={domAnimation}>
		<motion.div
			animate={{
				rotate: isCollapsed ? -90 : 0
			}}
			transition={{ duration: 0.5 }}
			whileHover={{ scale: 1.2 }}
		>
			<FontAwesomeIcon icon={faChevronDown} size='sm' />
		</motion.div>
	</LazyMotion>
)
