import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import times from 'lodash/times'
import { gridGap, itemHeight } from './utils'
import React, { FC } from 'react'

const useStyles = createUseStyles({
	skeleton: {
		'&:last-of-type': { marginBottom: 0 },
		marginBottom: ({ itemsCount, singleColumnItemsCount }) =>
			itemsCount > singleColumnItemsCount ? 0 : gridGap
	}
})

interface MultipleChoiceSkeletonProps {
	count: number
	itemsCount: number
	singleColumnItemsCount?: number
}

const MultipleChoiceSkeleton: FC<MultipleChoiceSkeletonProps> = (
	props: MultipleChoiceSkeletonProps
) => {
	const { count } = props

	const classes = useStyles(props)

	return (
		<>
			{times(count, i => (
				<Skeleton
					classes={[classes.skeleton]}
					height={itemHeight}
					key={i}
				/>
			))}
		</>
	)
}

export default MultipleChoiceSkeleton
