import { faChevronDown } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { FC } from 'react'

interface CollapseIndicatorProps {
	isCollapsed: boolean
}

export const CollapseIndicator: FC<CollapseIndicatorProps> = ({
	isCollapsed
}: CollapseIndicatorProps) => (
	<motion.div
		animate={{
			rotate: isCollapsed ? -90 : 0
		}}
		transition={{ duration: 0.5 }}
		whileHover={{ scale: 1.1 }}
	>
		<FontAwesomeIcon icon={faChevronDown} size='sm' />
	</motion.div>
)
