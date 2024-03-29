import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles/styleguide'
import React, { type FC } from 'react'
import { themes, ThemeType } from 'components/assets/styles/themes'

const { light, dark } = ThemeType

const { borderRadius } = styleguide

const generatePartialSkeletonStyles = (themeType: ThemeType) => {
	const { primary, secondary } = themes[themeType].state.loading

	return {
		backgroundColor: primary,
		backgroundImage: `linear-gradient(90deg, ${primary}, ${secondary} , ${primary})`
	}
}

const useStyles = createUseStyles({
	container: {
		...generatePartialSkeletonStyles(light),
		animation: props => `skeleton ${props.duration}s ease-in-out infinite`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '200px 100%',
		borderRadius: props => (props.circle ? '50%' : borderRadius),
		display: props => (props.count > 1 ? 'block' : 'inline-block'),
		height: props => (props.height ? props.height : '100%'),
		lineHeight: 1,
		marginBottom: props => (props.count > 1 ? 5 : 0),
		width: props => (props.width ? props.width : '100%')
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		'@keyframes skeleton': {
			'0%': { backgroundPosition: '-200px 0' },
			'100%': { backgroundPosition: 'calc(200px + 100%) 0' }
		},
		[`.${dark}`]: {
			'& $container': {
				...generatePartialSkeletonStyles(dark)
			}
		}
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
	 * Skeleton height. If undefined, skeleton will span the height of parent container or 16px - whichever is greater. **Note:** height is a required prop for a circle skeleton.
	 */
	height?: number
	/**
	 * Skeleton width. If undefined, skeleton will span the width of parent container. **Note**: width is a required prop for a circle skeleton.
	 */
	width?: number | string
}

interface CircleSkeletonProps
	extends Omit<DefaultSkeletonProps, 'circle' | 'height' | 'width'> {
	circle: true
	height: number
	width: number
}

export const Skeleton: FC<SkeletonProps> = (props: SkeletonProps) => {
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
