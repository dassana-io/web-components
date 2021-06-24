import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import { TabConfig } from '.'
import { domAnimation, LazyMotion, m as motion } from 'framer-motion'
import React, { FC } from 'react'

const { font, spacing } = styleguide

const useStyles = createUseStyles({
	tabPane: {
		...font.body,
		display: ({ isActive }) => (isActive ? 'block' : 'none'),
		height: '100%',
		padding: `${spacing.m}px ${spacing.l}px`
	}
})

interface TabPaneProps {
	isActive: boolean
	tabConfigItem: TabConfig
}

const [ACTIVE, INACTIVE] = ['active', 'inactive']

const TabPane: FC<TabPaneProps> = ({
	isActive,
	tabConfigItem: { classes = [], render }
}: TabPaneProps) => {
	const compClasses = useStyles({ isActive })

	return (
		<LazyMotion features={domAnimation}>
			<motion.div
				animate={isActive ? ACTIVE : INACTIVE}
				className={cn(compClasses.tabPane, classes)}
				transition={{ duration: 0.5 }}
				variants={{
					[ACTIVE]: { opacity: 1 },
					[INACTIVE]: { opacity: 0 }
				}}
			>
				{render()}
			</motion.div>
		</LazyMotion>
	)
}

export default TabPane
