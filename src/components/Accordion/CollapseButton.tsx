import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { FC } from 'react'

interface CollapseButtonProps {
	isCollapsed: boolean
}

export const CollapseButton: FC<CollapseButtonProps> = ({
	isCollapsed
}: CollapseButtonProps) => (
	<motion.div
		animate={{
			rotate: isCollapsed ? 0 : 180
		}}
		whileHover={{ scale: 1.1 }}
	>
		<FontAwesomeIcon icon={faChevronDown} />
	</motion.div>
)
