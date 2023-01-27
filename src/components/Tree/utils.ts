import { BaseOptionType } from 'antd/lib/select'
import { DataNode } from 'antd/es/tree'
import { OnChangeHandler, TreeId, TreeNodeType } from '.'

/**
 * Recursive function to process TreeData. It takes an array of nested TreeNodes and returns array of nested DataNodes formatted to satisfy antD requirements.
 */
export const processTreeSelectData = (nodes: TreeNodeType[] | undefined) => {
	if (!nodes) return []

	const mappedNodes = []

	for (const node of nodes) {
		// Note: To update when we know what BE will be sending
		const mappedNode: BaseOptionType = {
			title: node.name,
			value: node.id
		}

		const mappedChildren = processTreeSelectData(node.children)

		if (mappedChildren.length) mappedNode.children = mappedChildren

		mappedNodes.push(mappedNode)
	}

	return mappedNodes
}

/**
 * Recursive function to process TreeData. It takes an array of nested TreeNodes and returns array of nested DataNodes formatted to satisfy antD requirements.
 */
export const processTreeData = (nodes: TreeNodeType[] | undefined) => {
	if (!nodes) return []

	const mappedNodes = []

	for (const node of nodes) {
		// Note: To update when we know what BE will be sending
		const mappedNode: DataNode = { key: node.id, title: node.name }

		const mappedChildren = processTreeData(node.children)

		if (mappedChildren.length) mappedNode.children = mappedChildren

		mappedNodes.push(mappedNode)
	}

	return mappedNodes
}

/**
 * Helper function to filter checked leaf node keys from array of all checked nodes given by antd.
 * @param info {checkedNodes: DataNode[], ...} antd's onCheck callback param
 * @param onChange onChange handler passed as prop to Tree
 */
export const getLeafNodeIds = (
	info: Record<string, any>,
	onChange: OnChangeHandler
) =>
	onChange(
		info.checkedNodes.reduce((acc: TreeId[], cur: Record<string, any>) => {
			if (!cur.children) acc.push(cur.key)

			return acc
		}, [])
	)
