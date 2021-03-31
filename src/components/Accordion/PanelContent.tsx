import { Animate } from './Animate'
import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles'
import React, { FC, ReactNode } from 'react'

const { font, spacing } = styleguide

const useStyles = createUseStyles({
	content: {
		...font.body,
		padding: spacing.m,
		paddingTop: 0
	}
})

interface PanelContentProps {
	children: ReactNode
	isExpanded: boolean
}

export const PanelContent: FC<PanelContentProps> = ({
	children,
	isExpanded
}: PanelContentProps) => {
	const classes = useStyles()

	return (
		<Animate isExpanded={isExpanded}>
			<div className={classes.content}>{children}</div>
		</Animate>
	)
}
