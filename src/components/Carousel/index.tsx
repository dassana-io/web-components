import AnimatedImage from './AnimatedImage'
import Bullets from './Bullets'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import Title from './Title'
import { useWindowSize } from '@dassana-io/web-utils'
import { AnimatePresence, domMax, LazyMotion, m as motion } from 'framer-motion'
import React, {
	type FC,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import { useAutoPlay, wrap } from './utils'

const { flexCenter } = styleguide

const useStyles = createUseStyles({
	container: {
		...flexCenter,
		height: '100%',
		overflow: 'hidden',
		position: 'relative',
		width: '100%'
	},
	imageContainer: {
		position: 'absolute',
		textAlign: 'center'
	}
})

const variants = {
	center: {
		opacity: 1,
		x: 0,
		zIndex: 1
	},
	enter: (direction: number) => ({
		opacity: 0,
		x: direction > 0 ? 1000 : -1000
	}),
	exit: (direction: number) => ({
		opacity: 0,
		x: direction < 0 ? 1000 : -1000,
		zIndex: 0
	})
}

export interface ImageConfig {
	src: string
	title?: string
}

export interface CarouselProps {
	autoplayInterval?: number
	bulletClasses?: string[]
	containerClasses?: string[]
	imageClasses?: string[]
	images: ImageConfig[]
	titleClasses?: string[]
}

export const Carousel: FC<CarouselProps> = ({
	autoplayInterval = 0,
	bulletClasses = [],
	containerClasses = [],
	imageClasses = [],
	images,
	titleClasses = []
}: CarouselProps) => {
	const imageRef = useRef<HTMLImageElement>(null)
	const imageContainerRef = useRef<HTMLDivElement>(null)
	const [imageContainerHeight, setImageContainerHeight] = useState(0)
	const [[page, direction], setPage] = useState([0, 0])
	const classes = useStyles()

	const updateImageContainerHeight = () => {
		if (imageContainerRef.current) {
			setImageContainerHeight(imageContainerRef.current.clientHeight)
		}
	}

	/**
	 * Images are paginated absolutely (ie 1, 2, 3, 4, 5...) and passed into the wrap
	 * function to find the image ID within the array. Passing an absolute page
	 * index as the `motion` component's `key` prop allows `AnimatePresence` to
	 * detect it as an entirely new image so even 1 image can be infinitely paginated.
	 */
	const imageIndex = useMemo(
		() => wrap(0, images.length, page),
		[images.length, page]
	)

	const paginate = (newDirection: number) =>
		setPage([page + newDirection, newDirection])

	useAutoPlay(autoplayInterval, () => paginate(1))

	useLayoutEffect(updateImageContainerHeight, [])
	useWindowSize(updateImageContainerHeight)

	useEffect(() => {
		if (imageRef.current) {
			imageRef.current.addEventListener(
				'load',
				updateImageContainerHeight
			)
		}
	}, [])

	return (
		<div className={classes.container}>
			<LazyMotion features={domMax}>
				<AnimatePresence custom={direction} initial={false}>
					<motion.div
						animate='center'
						className={classes.imageContainer}
						custom={direction}
						exit='exit'
						initial='enter'
						key={page}
						ref={imageContainerRef}
						transition={{
							opacity: { duration: 0.2 },
							x: {
								damping: 30,
								stiffness: 300,
								type: 'spring'
							}
						}}
						variants={variants}
					>
						{images[imageIndex].title && (
							<Title
								classes={titleClasses}
								title={images[imageIndex].title}
							/>
						)}
						<AnimatedImage
							classes={imageClasses}
							paginate={paginate}
							ref={imageRef}
							src={images[imageIndex].src}
						/>
					</motion.div>
				</AnimatePresence>
			</LazyMotion>
			<Bullets
				activeIndex={imageIndex}
				bulletClasses={bulletClasses}
				containerClasses={containerClasses}
				count={images.length}
				offsetTop={imageContainerHeight}
				onClick={i => setPage([i, i > imageIndex ? 1 : -1])}
				paginate={paginate}
			/>
		</div>
	)
}
