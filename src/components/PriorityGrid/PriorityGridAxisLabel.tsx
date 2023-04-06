import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from '../assets/styles'
import React, { FC } from 'react'

const { font, fontWeight } = styleguide

const useStyles = createUseStyles({
	priorityGridAxisLabel: {
		'&$rotate': {
			writingMode: 'vertical-rl'
		},
		...font.body,
		fontWeight: fontWeight.light,
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
