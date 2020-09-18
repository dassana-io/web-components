import 'antd/lib/tree/style/index.css'
import '../assets/styles/antdBaseStyles.css'
import { Tree as AntDTree } from 'antd'
import { CommonComponentProps } from '../types'
import { getDataTestAttributeProp } from '../utils'
import TreeSkeleton from './TreeSkeleton'
import { mapOnCheckArgs, processTreeData } from './utils'
import React, { FC } from 'react'

export interface TreeNodeType {
	id: string | number
	name: string
	children?: TreeNodeType[]
}

interface OnCheckHandlerParams {
	checkedNodes: TreeNodeType[]
	checkedKeys: (string | number)[]
	checked: boolean
	checkedNode: TreeNodeType
}

export interface OnCheckHandler {
	(params: OnCheckHandlerParams): void
}

interface PartialTreeProps extends CommonComponentProps {
	/**
	 * Array of nested objects of type - TreeNodeType to be passed to Tree
	 */
	treeData: TreeNodeType[]
	/**
	 * Callback that runs when element is checked
	 */
	onCheck: OnCheckHandler
	/**
	 * Number of blocks of skeleton loaders to show if loading is true. Each block will have between 3-5 nodes of variable width
	 */
	skeletonBlockCount?: number
}

interface LoadingTreeProps extends Partial<PartialTreeProps> {
	/**
	 * Whether or not to show skeleton loader
	 */
	loading: true
}

interface DataTreeProps extends PartialTreeProps {
	/**
	 * Whether or not to show skeleton loader
	 */
	loading?: false
}

export type TreeProps = LoadingTreeProps | DataTreeProps

export type TreeNodesHash = Record<string | number, TreeNodeType>

const Tree: FC<TreeProps> = ({
	dataTag,
	onCheck,
	treeData,
	loading = false,
	skeletonBlockCount = 3
}: TreeProps) => {
	const { mappedTreeData, treeNodeHash } = processTreeData(treeData)

	let controlledCmpProps = {}

	if (onCheck) {
		const handleOnCheck = (
			checked: (string | number)[],
			info: Record<string, any>
		) => onCheck(mapOnCheckArgs({ checked, info, treeNodeHash }))

		controlledCmpProps = {
			onCheck: handleOnCheck,
			treeData: mappedTreeData
		}
	}

	return loading ? (
		<TreeSkeleton blockCount={skeletonBlockCount} />
	) : (
		<AntDTree
			blockNode
			checkable
			defaultExpandAll
			selectable={false}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('tree', dataTag)}
		/>
	)
}

export default Tree
