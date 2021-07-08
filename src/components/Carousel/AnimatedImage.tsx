import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { m as motion } from 'framer-motion'
import React, {
	forwardRef,
	ForwardRefExoticComponent,
	RefAttributes
} from 'react'

const useStyles = createUseStyles({
	image: {
		height: '100%',
		width: '100%'
	}
})

/**
 * The less distance a user has swiped, the more velocity needed to register as a swipe.
 * The swipe power function accomodates longer swipes and short flicks without having binary checks
 * on just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) =>
	Math.abs(offset) * velocity

interface AnimatedImageProps {
	classes?: string[]
	paginate: (i: number) => void
	src: string
}

const AnimatedImage: ForwardRefExoticComponent<
	AnimatedImageProps & RefAttributes<HTMLImageElement>
> = forwardRef<HTMLImageElement, AnimatedImageProps>(
	({ classes = [], paginate, src }: AnimatedImageProps, ref) => {
		const imageClasses = useStyles()

		return (
			<motion.img
				className={cn({ [imageClasses.image]: true }, classes)}
				drag='x'
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={1}
				onDragEnd={(_e, { offset, velocity }) => {
					const swipe = swipePower(offset.x, velocity.x)

					if (swipe < -swipeConfidenceThreshold) {
						paginate(1)
					} else if (swipe > swipeConfidenceThreshold) {
						paginate(-1)
					}
				}}
				ref={ref}
				src={src}
			/>
		)
	}
)

export default AnimatedImage
