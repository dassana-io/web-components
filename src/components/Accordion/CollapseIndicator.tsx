import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
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
			rotate: isCollapsed ? 0 : 180
		}}
		transition={{ duration: 0.5 }}
		whileHover={{ scale: 1.1 }}
	>
		<FontAwesomeIcon icon={faChevronDown} />
	</motion.div>
)
