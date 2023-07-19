import { createUseStyles } from 'react-jss'
import random from 'lodash/random'
import { Skeleton } from '../Skeleton'
import { styleguide } from 'components/assets/styles'
import times from 'lodash/times'
import React, { type FC, Fragment, type Key } from 'react'

const { flexAlignCenter } = styleguide

const useStyles = createUseStyles({
	skeletonLabel: {
		marginLeft: 5
	},
	treeNodeSkeleton: {
		...flexAlignCenter,
		marginLeft: props => (props.nestLevel ? props.nestLevel * 20 : 0),
		paddingBottom: 10
	}
})

interface TreeNodeSkeletonProps {
	nestLevel?: number
}

export const TreeNodeSkeleton: FC<TreeNodeSkeletonProps> = (
	props: TreeNodeSkeletonProps
) => {
	const classes = useStyles(props)

	return (
		<div className={classes.treeNodeSkeleton}>
			<Skeleton height={15} width={15} />
			<Skeleton
				classes={[classes.skeletonLabel]}
				height={20}
				width={random(100, 240)}
			/>
		</div>
	)
}

const generateTreeNodeSkeletons = (count: number, treeNodeCount?: number) => (
	<>
		{times(count, (j: number) => {
			return (
				<TreeNodeSkeleton
					key={j}
					nestLevel={treeNodeCount ? treeNodeCount - 1 : j}
				/>
			)
		})}
	</>
)

const generateTreeBlock = (i: Key, treeNodeCount: number) => (
	<Fragment key={i}>
		{generateTreeNodeSkeletons(treeNodeCount - 1)}
		{generateTreeNodeSkeletons(random(1, 3), treeNodeCount)}
	</Fragment>
)

interface TreeSkeletonProps {
	blockCount: number
	treeNodeCount: number
}

const TreeSkeleton: FC<TreeSkeletonProps> = ({
	blockCount,
	treeNodeCount
}: TreeSkeletonProps) => (
	<div>{times(blockCount, i => generateTreeBlock(i, treeNodeCount))}</div>
)

export default TreeSkeleton
