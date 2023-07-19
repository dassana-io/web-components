import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import { type TabConfig } from '.'
import { domAnimation, LazyMotion, m as motion } from 'framer-motion'
import React, { type FC } from 'react'

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
	forceRender: boolean
	isActive: boolean
	tabConfigItem: TabConfig
	transitionDuration?: number
}

const [ACTIVE, INACTIVE] = ['active', 'inactive']

const TabPane: FC<TabPaneProps> = ({
	forceRender,
	isActive,
	tabConfigItem: { classes = [], render },
	transitionDuration = 0.5
}: TabPaneProps) => {
	const compClasses = useStyles({ isActive })

	/**
	 * Lazy load content unless forceRender is set as true, then only render content
	 * if current tab is active.
	 */
	const showContent = !forceRender || (forceRender && isActive)

	return (
		<LazyMotion features={domAnimation}>
			<motion.div
				animate={isActive ? ACTIVE : INACTIVE}
				className={cn(compClasses.tabPane, classes)}
				transition={{ duration: transitionDuration }}
				variants={{
					[ACTIVE]: { opacity: 1 },
					[INACTIVE]: { opacity: 0 }
				}}
			>
				{showContent && render()}
			</motion.div>
		</LazyMotion>
	)
}

export default TabPane
