import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles'
import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	content: {
		padding: spacing.m,
		paddingTop: 0
	}
})

interface PanelContentProps {
	children: ReactNode
	isActive: boolean
}

export const PanelContent: FC<PanelContentProps> = ({
	children,
	isActive
}: PanelContentProps) => {
	const classes = useStyles()

	return (
		<AnimatePresence initial={false}>
			{isActive && (
				<motion.section
					animate='open'
					exit='collapsed'
					initial='collapsed'
					transition={{
						duration: 0.8,
						ease: [0.04, 0.62, 0.23, 0.98]
					}}
					variants={{
						collapsed: { height: 0, opacity: 0 },
						open: { height: 'auto', opacity: 1 }
					}}
				>
					<div className={classes.content}>{children}</div>
				</motion.section>
			)}
		</AnimatePresence>
	)
}
