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

interface ProgressBarProps {
	percent: number
	width?: number
}

const ProgressBar: FC<ProgressBarProps> = ({
	percent,
	width = 100
}: ProgressBarProps) => {
	const [value, setValue] = useState(0)

	const classes = useClasses({ containerWidth: width, progressWidth: value })

	useEffect(() => setValue(percent * 0.01 * width), [percent, width])

	return (
		<div className={classes.container}>
			<div className={classes.progressBar} />
		</div>
	)
}

export default ProgressBar
