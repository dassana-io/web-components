import 'antd/lib/tree/style/index.css'
import '../assets/styles/antdBaseStyles.css'
import cn from 'classnames'
import { type CommonComponentProps } from '../types'
import type { DataNode } from 'antd/lib/tree'
import { getDataTestAttributeProp } from '../utils'
import { getLeafNodeIds } from './utils'
import TreeSkeleton from './TreeSkeleton'
import { useTreeStyles } from './styles'
import { Tree as AntDTree, type TreeProps as AntDTreeProps } from 'antd'
import React, { type FC, type ReactNode } from 'react'

export type TreeId = string | number

export interface TreeNodeType {
	id: TreeId
	name: ReactNode
	children?: TreeNodeType[]
}

export type OnChangeHandler = (checkedKeys: TreeId[]) => void

export interface TreeProps extends CommonComponentProps {
	/**
	 * Array of nested objects of type - TreeNodeType to be passed to Tree
	 */
	treeData: DataNode[]
	/**
	 * Array of classes to pass to element
	 */
	classes?: string[]
	/**
	 * Whether or not tree items have checkboxes
	 */
	checkable?: boolean
	/**
	 * Array of tree nodes that are initially default checked
	 */
	defaultChecked?: TreeId[]
	defaultExpandAll?: boolean
	defaultExpandedKeys?: AntDTreeProps['defaultExpandedKeys']
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events)
	 */
	disabled?: boolean
	fieldNames?: AntDTreeProps['fieldNames']
	/**
	 * Whether or not to show skeleton loader
	 */
	loading?: boolean
	/**
	 * Callback that runs when element is checked
	 */
	onChange?: OnChangeHandler
	onSelect?: AntDTreeProps['onSelect']
	/**
	 * Number of blocks of skeleton blocks to show if loading is true. Each block will have between 3-5 skeleton tree nodes of variable width
	 */
	skeletonBlockCount?: number
	/**
	 * Number of skeleton tree nodes inside a skeleton block to show if loading is true. This also determines how many levels the skeleton tree nodes will be nested
	 */
	skeletonTreeNodeCount?: number
	selectable?: boolean
	selected?: AntDTreeProps['selectedKeys']
	titleRender?: AntDTreeProps['titleRender']
	value?: string | string[]
}

export type TreeNodesHash = Record<TreeId, TreeNodeType>
export type { DataNode }

export const Tree: FC<TreeProps> = ({
	classes = [],
	checkable = true,
	dataTag,
	defaultChecked = [],
	defaultExpandAll = true,
	defaultExpandedKeys = [],
	disabled = false,
	fieldNames,
	loading = false,
	onChange,
	onSelect,
	skeletonBlockCount = 3,
	skeletonTreeNodeCount = 3,
	selectable = true,
	selected = [],
	titleRender,
	treeData,
	value
}: TreeProps) => {
	// const mappedTreeData = processTreeData(treeData)

	const componentClasses = useTreeStyles()

	let controlledCmpProps = {}

	const treeClasses = cn({ [componentClasses.tree]: true }, classes)

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
			checkable={checkable}
			className={treeClasses}
			defaultCheckedKeys={defaultChecked}
			defaultExpandAll={defaultExpandAll}
			defaultExpandedKeys={defaultExpandedKeys}
			disabled={disabled}
			fieldNames={fieldNames}
			onSelect={onSelect}
			selectable={selectable}
			selectedKeys={selected}
			titleRender={titleRender}
			treeData={treeData}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('tree', dataTag)}
		/>
	)
}
