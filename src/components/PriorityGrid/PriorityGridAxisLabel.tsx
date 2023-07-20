import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles'
import React, { type FC } from 'react'

const { font, fontWeight, spacing } = styleguide

const useStyles = createUseStyles({
	priorityGridAxisLabel: {
		'&$rotate': {
			paddingRight: 0,
			writingMode: 'vertical-rl'
		},
		...font.body,
		fontWeight: fontWeight.light,
		paddingRight: spacing.m,
		textAlign: 'center'
	},
	rotate: {}
})

interface PriorityGridAxisLabelProps {
	label: string
	rotate?: boolean
}

export const PriorityGridAxisLabel: FC<PriorityGridAxisLabelProps> = ({
	label,
	rotate = false
}: PriorityGridAxisLabelProps) => {
	const classes = useStyles()

	const componentClasses = cn({
		[classes.priorityGridAxisLabel]: true,
		[classes.rotate]: rotate
	})

	return <div className={componentClasses}>{label}</div>
}
