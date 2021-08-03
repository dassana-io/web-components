import { Breakpoints } from '@dassana-io/web-utils'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { IconButton } from '../IconButton'
import { mediaSelectorsWithBreakpoints } from 'components/utils'
import { styleguide } from 'components/assets/styles'
import times from 'lodash/times'
import {
	faChevronLeft,
	faChevronRight
} from '@fortawesome/pro-regular-svg-icons'
import React, { FC, useLayoutEffect, useRef, useState } from 'react'

const {
	colors: { blues, grays },
	spacing
} = styleguide

const { max } = mediaSelectorsWithBreakpoints
const { tablet } = Breakpoints

const useStyles = createUseStyles({
	activeBullet: {
		background: blues.base,
		cursor: 'default'
	},
	arrow: {
		bottom: 2,
		position: 'absolute',
		[max[tablet]]: { display: 'none' }
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
			offsetTop + spacing.xl + containerHeight / 2,
		position: 'relative'
	},
	left: {
		right: 200
	},
	right: {
		left: 200
	}
})

interface BulletsProps {
	activeIndex: number
	bulletClasses?: string[]
	containerClasses?: string[]
	count: number
	offsetTop: number
	onClick: (i: number) => void
	paginate: (newDirection: number) => void
}

const Bullets: FC<BulletsProps> = ({
	activeIndex,
	bulletClasses,
	containerClasses,
	count,
	offsetTop,
	onClick,
	paginate
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
			<IconButton
				classes={[classes.arrow, classes.left]}
				icon={faChevronLeft}
				onClick={() => paginate(-1)}
			/>
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
			<IconButton
				classes={[classes.arrow, classes.right]}
				icon={faChevronRight}
				onClick={() => paginate(1)}
			/>
		</div>
	)
}

export default Bullets
