import 'antd/lib/tree/style/index.css'
import '../assets/styles/antdBaseStyles.css'
import { Tree as AntDTree } from 'antd'
import cn from 'classnames'
import { type CommonComponentProps } from '../types'
import { getDataTestAttributeProp } from '../utils'
import TreeSkeleton from './TreeSkeleton'
import { getLeafNodeIds, processTreeData } from './utils'
import React, { type FC } from 'react'

export type TreeId = string | number

export interface TreeNodeType {
	id: TreeId
	name: string
	children?: TreeNodeType[]
}

export type OnChangeHandler = (checkedKeys: TreeId[]) => void

export interface TreeProps extends CommonComponentProps {
	/**
	 * Array of nested objects of type - TreeNodeType to be passed to Tree
	 */
	treeData: TreeNodeType[]
	/**
	 * Array of classes to pass to element
	 */
	classes?: string[]
	/**
	 * Array of tree nodes that are initially default checked
	 */
	defaultChecked?: TreeId[]
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events)
	 */
	disabled?: boolean
	/**
	 * Whether or not to show skeleton loader
	 */
	loading?: boolean
	/**
	 * Callback that runs when element is checked
	 */
	onChange?: OnChangeHandler
	/**
	 * Number of blocks of skeleton blocks to show if loading is true. Each block will have between 3-5 skeleton tree nodes of variable width
	 */
	skeletonBlockCount?: number
	/**
	 * Number of skeleton tree nodes inside a skeleton block to show if loading is true. This also determines how many levels the skeleton tree nodes will be nested
	 */
	skeletonTreeNodeCount?: number
	value?: string | string[]
}

export type TreeNodesHash = Record<TreeId, TreeNodeType>

export const Tree: FC<TreeProps> = ({
	classes = [],
	dataTag,
	defaultChecked = [],
	disabled = false,
	loading = false,
	onChange,
	skeletonBlockCount = 3,
	skeletonTreeNodeCount = 3,
	treeData,
	value
}: TreeProps) => {
	const mappedTreeData = processTreeData(treeData)

	let controlledCmpProps = {}

	const treeClasses = cn(classes)

	if (onChange) {
		controlledCmpProps = {
			onCheck: (_: TreeId[], info: Record<string, any>) =>
				getLeafNodeIds(info, onChange)
		}
	}

	if (skeletonBlockCount < 1) {
		throw new Error('skeletonBlockCount must be a positive integer')
	}

	if (skeletonTreeNodeCount < 1) {
		throw new Error('skeletonTreeNodeCount must be a positive integer')
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
			defaultCheckedKeys={defaultChecked}
			defaultExpandAll
			disabled={disabled}
			selectable={false}
			treeData={mappedTreeData}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('tree', dataTag)}
		/>
	)
}
