import 'antd/lib/tree/style/index.css'
import '../assets/antdBaseStyles.css'
import { Tree as AntDTree } from 'antd'
import { processTreeData } from './utils'
import TreeSkeleton from './TreeSkeleton'
import React, { FC } from 'react'

export interface TreeDataType {
	id: string | number
	name: string
	children?: TreeDataType[]
}

export interface TreeProps {
	/**
	 * Array of nested objects of type - TreeDataType to be passed to Tree
	 */
	treeData: TreeDataType[]
	/**
	 * Whether or not to show skeleton loader
	 */
	loading?: boolean
	/**
	 * Number of blocks of skeleton loaders to show if loading is true. Each block will have between 3-5 nodes of variable width
	 */
	skeletonBlockCount?: number
}

const Tree: FC<TreeProps> = ({
	treeData,
	loading = false,
	skeletonBlockCount = 3
}: TreeProps) => {
	const mappedTreeData = processTreeData(treeData)

	return loading ? (
		<TreeSkeleton blockCount={skeletonBlockCount} />
	) : (
		<AntDTree
			blockNode
			checkable
			defaultExpandAll
			selectable={false}
			treeData={mappedTreeData}
		/>
	)
}

export default Tree
