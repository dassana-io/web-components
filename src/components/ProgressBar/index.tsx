import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import React, { FC, useEffect, useState } from 'react'

const {
	colors: { blacks, blues },
	spacing
} = styleguide

interface StyleProps {
	containerWidth: number
	progressWidth: number
}

const useClasses = createUseStyles({
	container: {
		backgroundColor: blacks['lighten-50'],
		borderRadius: spacing.s,
		width: ({ containerWidth }: StyleProps) => containerWidth
	},
	progressBar: {
		backgroundColor: blues.base,
		borderRadius: spacing.m,
		height: 10,
		transition: ({ progressWidth }: StyleProps) =>
			progressWidth > 0 ? 'ease 0.5s' : 'none',
		width: ({ progressWidth }: StyleProps) => progressWidth
	}
})

export interface ProgressBarProps {
	containerClasses?: string[]
	percent: number
	progressBarClasses?: string[]
	width?: number
}

export const ProgressBar: FC<ProgressBarProps> = ({
	containerClasses = [],
	percent,
	progressBarClasses = [],
	width = 100
}: ProgressBarProps) => {
	const [value, setValue] = useState(0)

	const classes = useClasses({ containerWidth: width, progressWidth: value })

	useEffect(() => setValue(percent * 0.01 * width), [percent, width])

	return (
		<div className={cn({ [classes.container]: true }, containerClasses)}>
			<div
				className={cn(
					{ [classes.progressBar]: true },
					progressBarClasses
				)}
			/>
		</div>
	)
}
