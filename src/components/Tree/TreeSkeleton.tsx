import { createUseStyles } from 'react-jss'
import random from 'lodash/random'
import Skeleton from '../Skeleton'
import times from 'lodash/times'
import React, { FC, Fragment, Key } from 'react'

const useStyles = createUseStyles({
	skeletonLabel: {
		marginLeft: 5
	},
	skeletonTreeNode: {
		alignItems: 'center',
		display: 'flex',
		marginLeft: props => (props.nestLevel ? props.nestLevel * 20 : 0),
		paddingBottom: 10
	}
})

interface SkeletonTreeNodeProps {
	nestLevel?: number
}

export const SkeletonTreeNode: FC<SkeletonTreeNodeProps> = (
	props: SkeletonTreeNodeProps
) => {
	const classes = useStyles(props)

	return (
		<div className={classes.skeletonTreeNode}>
			<Skeleton height={15} width={15} />
			<Skeleton
				classes={[classes.skeletonLabel]}
				height={20}
				width={random(100, 240)}
			/>
		</div>
	)
}

const generateTreeBlock = (i: Key) => (
	<Fragment key={i}>
		<SkeletonTreeNode />
		<SkeletonTreeNode nestLevel={1} />
		{times(random(1, 3), (j: number) => (
			<SkeletonTreeNode key={j} nestLevel={2} />
		))}
	</Fragment>
)

interface TreeSkeletonProps {
	blockCount: number
}

const TreeSkeleton: FC<TreeSkeletonProps> = ({
	blockCount
}: TreeSkeletonProps) => (
	<div>{times(blockCount, i => generateTreeBlock(i))}</div>
)

export default TreeSkeleton
