import 'antd/lib/tree/style/index.css'
import '../assets/styles/antdBaseStyles.css'
import { Tree as AntDTree } from 'antd'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import { getDataTestAttributeProp } from '../utils'
import { processTreeData } from './utils'
import TreeSkeleton from './TreeSkeleton'
import React, { FC } from 'react'

export type TreeId = string | number

export interface TreeNodeType {
	id: TreeId
	name: string
	children?: TreeNodeType[]
}

export interface OnChangeHandler {
	(checkedKeys: TreeId[]): void
}

export interface TreeProps extends CommonComponentProps {
	/**
	 * Array of nested objects of type - TreeNodeType to be passed to Tree
	 */
	treeData: TreeNodeType[]
	/**
	 * Callback that runs when element is checked
	 */
	onChange?: OnChangeHandler
	/**
	 * Array of classes to pass to element
	 */
	classes?: string[]
	/**
	 * Whether or not to show skeleton loader
	 */
	loading?: boolean
	/**
	 * Number of blocks of skeleton blocks to show if loading is true. Each block will have between 3-5 skeleton tree nodes of variable width
	 */
	skeletonBlockCount?: number
	/**
	 * Number of skeleton tree nodes inside a skeleton block to show if loading is true. This also determines how many levels the skeleton tree nodes will be nested
	 */
	skeletonTreeNodeCount?: number
}

export type TreeNodesHash = Record<TreeId, TreeNodeType>

const Tree: FC<TreeProps> = ({
	classes = [],
	dataTag,
	loading = false,
	onChange,
	skeletonBlockCount = 3,
	skeletonTreeNodeCount = 3,
	treeData
}: TreeProps) => {
	const mappedTreeData = processTreeData(treeData)

	let controlledCmpProps = {}

	const treeClasses = cn(classes)

	if (onChange) {
		controlledCmpProps = {
			onCheck: (_: TreeId[], info: Record<string, any>) =>
				onChange(
					info.checkedNodes.reduce(
						(acc: TreeId[], cur: Record<string, any>) => {
							if (!cur.children) acc.push(cur.key)

							return acc
						},
						[]
					)
				)
		}
	}

	return loading ? (
		<TreeSkeleton
			blockCount={skeletonBlockCount}
			treeNodeCount={skeletonTreeNodeCount}
		/>
	) : (
		<AntDTree
			blockNode
			checkable
			className={treeClasses}
			defaultExpandAll
			selectable={false}
			treeData={mappedTreeData}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('tree', dataTag)}
		/>
	)
}

export default Tree
