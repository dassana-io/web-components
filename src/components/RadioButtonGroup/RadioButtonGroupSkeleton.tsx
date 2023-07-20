import { createUseStyles } from 'react-jss'
import { generateRadioSkeletonStyles } from './utils'
import { Skeleton } from '../Skeleton'
import { ThemeType } from 'components/assets/styles/themes'
import times from 'lodash/times'
import React, { type FC } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		display: 'flex'
	},
	skeleton: {
		borderRadius: 'unset'
	},
	skeletonButton: generateRadioSkeletonStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $skeletonButton': generateRadioSkeletonStyles(dark)
		}
	}
})

interface Props {
	count: number
}

const RadioGroupSkeleton: FC<Props> = ({ count }: Props) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			{times(count, i => (
				<div className={classes.skeletonButton} key={i}>
					<Skeleton
						classes={[classes.skeleton]}
						height={32}
						width={75}
					/>
				</div>
			))}
		</div>
	)
}

export default RadioGroupSkeleton
