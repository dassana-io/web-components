import 'antd/lib/tree/style/index.css'
import '../assets/antdBaseStyles.css'
import { Tree as AntDTree } from 'antd'
import { processTreeData } from './utils'
import React, { FC } from 'react'

export interface TreeDataType {
	id: string | number
	name: string
	children?: TreeDataType[]
}

export interface TreeProps {
	/**
	 * Array of nested objects of type - TreeDataType to be passed to Tree.
	 */
	treeData: TreeDataType[]
}

const Tree: FC<TreeProps> = ({ treeData }: TreeProps) => {
	const mappedTreeData = processTreeData(treeData)

	return (
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
