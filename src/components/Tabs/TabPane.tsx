import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { motion } from 'framer-motion'
import { styleguide } from 'components/assets/styles'
import { TabConfig } from '.'
import React, { FC } from 'react'

const { font, spacing } = styleguide

const useStyles = createUseStyles({
	tabPane: {
		...font.body,
		display: ({ isActive }) => (isActive ? 'block' : 'none'),
		padding: `${spacing.m}px ${spacing.l}px`
	}
})

interface TabPaneProps {
	isActive: boolean
	tabConfigItem: TabConfig
}

const TabPane: FC<TabPaneProps> = ({
	isActive,
	tabConfigItem: { classes = [], render }
}: TabPaneProps) => {
	const compClasses = useStyles({ isActive })

	return (
		<motion.section
			animate={isActive ? 'active' : 'inactive'}
			transition={{ duration: 0.5 }}
			variants={{
				active: { opacity: 1 },
				inactive: { opacity: 0 }
			}}
		>
			<div className={cn(compClasses.tabPane, classes)}>{render()}</div>
		</motion.section>
	)
}

export default TabPane
