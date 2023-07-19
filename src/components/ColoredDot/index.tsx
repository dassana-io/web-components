import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Tooltip } from 'components/Tooltip'
import React, { type FC } from 'react'

const useStyles = createUseStyles({
	coloredDot: {
		background: ({ color }) => (color || 'transparent'),
		borderRadius: '50%',
		display: 'block',
		height: 10,
		width: 10
	}
})

export interface ColoredDotProps {
	classes?: string[]
	color?: string
	tooltipText?: string
}

export const ColoredDot: FC<ColoredDotProps> = ({
	classes = [],
	color,
	tooltipText
}: ColoredDotProps) => {
	const componentClasses = useStyles({
		color
	})

	const dotClass = cn(componentClasses.coloredDot, classes)

	const showTooltip = color && tooltipText

	return showTooltip
? (
		<Tooltip placement='top' renderWithoutDataTag title={tooltipText}>
			<span className={dotClass}></span>
		</Tooltip>
	)
: (
		<span className={dotClass}></span>
	)
}
