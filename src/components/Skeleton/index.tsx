import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import React, { FC } from 'react'

const useStyles = createUseStyles({
	'@global': {
		'@keyframes skeleton': {
			'0%': { backgroundPosition: '-200px 0' },
			'100%': { backgroundPosition: 'calc(200px + 100%) 0' }
		}
	},
	container: {
		animation: props => `skeleton ${props.duration}s ease-in-out infinite`,
		backgroundColor: '#EEEEEE',
		backgroundImage: 'linear-gradient(90deg, #EEEEEE, #F5F5F5, #EEEEEE)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '200px 100%',
		borderRadius: props => (props.circle ? '50%' : '4px'),
		display: props => (props.count > 1 ? 'block' : 'inline-block'),
		height: props => (props.height ? props.height : '100%'),
		lineHeight: 1,
		marginBottom: props => (props.count > 1 ? 5 : 0),
		width: props => (props.width ? `${props.width}px` : '100%')
	}
})

export type SkeletonProps = DefaultSkeletonProps | CircleSkeletonProps

interface DefaultSkeletonProps {
	/**
	 * Whether or not to render circle skeleton. **Only works if height and width are set to be the same number**
	 */
	circle?: false
	/**
	 * Array of classes to pass to skeleton
	 */
	classes?: string[]
	/**
	 * Number of skeleton rows to render
	 */
	count?: number
	/**
	 * Animation duration
	 */
	duration?: number
	/**
	 * Skeleton height
	 */
	height?: number
	/**
	 * Width of skeleton. If undefined, skeleton will span the width of parent container
	 */
	width?: number
}

interface CircleSkeletonProps
	extends Omit<DefaultSkeletonProps, 'circle' | 'height' | 'width'> {
	circle: true
	height: number
	width: number
}

const Skeleton: FC<SkeletonProps> = (props: SkeletonProps) => {
	const { classes: customClasses, count } = props

	const classes = useStyles(props)

	const skeletonClasses = cn(
		{
			[classes.container]: true
		},
		customClasses
	)

	return (
		<>
			{[...Array(count)].map((_, i) => (
				<span className={skeletonClasses} key={i}>
					&nbsp;
				</span>
			))}
		</>
	)
}

Skeleton.defaultProps = {
	circle: false,
	classes: [],
	count: 1,
	duration: 1.2
}

export default Skeleton
