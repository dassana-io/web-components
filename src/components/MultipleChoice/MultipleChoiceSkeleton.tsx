import { Skeleton } from 'components/Skeleton'
import times from 'lodash/times'
import React, { FC } from 'react'

interface MultipleChoiceSkeletonProps {
	count: number
}

const MultipleChoiceSkeleton: FC<MultipleChoiceSkeletonProps> = ({
	count
}: MultipleChoiceSkeletonProps) => (
	<>
		{times(count, i => (
			<Skeleton height={40} key={i} />
		))}
	</>
)

export default MultipleChoiceSkeleton
