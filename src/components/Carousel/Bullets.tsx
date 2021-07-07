import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import times from 'lodash/times'
import React, { FC, useLayoutEffect, useRef, useState } from 'react'

const {
	colors: { blues, grays },
	spacing
} = styleguide

const useStyles = createUseStyles({
	activeBullet: {
		background: blues.base,
		cursor: 'default'
	},
	bullet: {
		'&$activeBullet': {
			background: blues.base,
			cursor: 'default'
		},
		'&:not(:last-of-type)': {
			marginRight: spacing['s+']
		},
		background: grays.base,
		borderRadius: '50%',
		cursor: 'pointer',
		display: 'inline-block',
		height: 10,
		width: 10
	},
	container: {
		paddingTop: ({ containerHeight, offsetTop }) =>
			offsetTop + spacing.xl + containerHeight / 2
	}
})

interface BulletsProps {
	activeIndex: number
	bulletClasses?: string[]
	containerClasses?: string[]
	count: number
	offsetTop: number
	onClick: (i: number) => void
}

const Bullets: FC<BulletsProps> = ({
	activeIndex,
	bulletClasses,
	containerClasses,
	count,
	offsetTop,
	onClick
}: BulletsProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [containerHeight, setContainerHeight] = useState(0)
	const classes = useStyles({ containerHeight, offsetTop })

	useLayoutEffect(() => {
		if (containerRef.current) {
			setContainerHeight(containerRef.current.offsetHeight)
		}
	}, [])

	return (
		<div
			className={cn({ [classes.container]: true }, containerClasses)}
			ref={containerRef}
		>
			{times(count, (i: number) => (
				<div
					className={cn(
						{
							[classes.activeBullet]: i === activeIndex,
							[classes.bullet]: true
						},
						bulletClasses
					)}
					key={i}
					onClick={() => onClick(i)}
				/>
			))}
		</div>
	)
}

export default Bullets
