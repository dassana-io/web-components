import cn from 'classnames'
import { motion, Variants } from 'framer-motion'
import React, {
	FC,
	ReactNode,
	RefObject,
	useEffect,
	useRef,
	useState
} from 'react'

export enum BounceDirection {
	vertical = 'vertical',
	horizontal = 'horizontal'
}

const { horizontal, vertical } = BounceDirection

const getVariants = (
	direction: BounceDirection,
	distance: number
): Variants => ({
	bounce: {
		transition: {
			duration: 0.4,
			ease: 'easeInOut',
			repeat: Infinity,
			repeatType: 'reverse'
		},
		x: direction === horizontal ? distance : 0,
		y: direction === vertical ? distance : 0
	},
	static: {
		x: 0,
		y: 0
	}
})

export interface BounceProps {
	children: ReactNode
	classes?: string[]
	containerRef?: RefObject<HTMLDivElement>
	direction?: BounceDirection
	distance?: number
}

export const Bounce: FC<BounceProps> = ({
	children,
	classes = [],
	containerRef,
	direction = vertical,
	distance = 8
}: BounceProps) => {
	const cmpRef = useRef<HTMLDivElement>(null)
	const hoverRef = containerRef ? containerRef : cmpRef

	const hovering = useHover(hoverRef)

	return (
		<motion.div
			animate={hovering ? 'bounce' : 'static'}
			className={cn(classes)}
			exit='static'
			initial='static'
			ref={cmpRef}
			variants={getVariants(direction, distance)}
		>
			{children}
		</motion.div>
	)
}

const useHover = (containerRef: RefObject<HTMLDivElement>) => {
	const [hovering, setHovering] = useState(false)

	const handleMouseover = () => setHovering(true)
	const handleMouseout = () => setHovering(false)

	useEffect(() => {
		const refCurrent = containerRef.current

		if (refCurrent) {
			refCurrent.addEventListener('mouseover', handleMouseover)
			refCurrent.addEventListener('mouseout', handleMouseout)

			return () => {
				refCurrent.removeEventListener('mouseover', handleMouseover)
				refCurrent.removeEventListener('mouseout', handleMouseout)
			}
		}
	}, [containerRef])

	return hovering
}
