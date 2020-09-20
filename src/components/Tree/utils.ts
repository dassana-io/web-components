import { DataNode } from 'antd/es/tree'
import { TreeNodeType } from '.'

/**
 * Recursive function to process TreeData. It takes an array of nested TreeNodes and returns array of nested DataNodes formatted to satisfy antD requirements.
 */
export const processTreeData = (nodes: TreeNodeType[] | undefined) => {
	if (!nodes) return []

	const mappedNodes = []

	for (const node of nodes) {
		const mappedNode: DataNode = { key: node.id, title: node.name }

		const mappedChildren = processTreeData(node.children)

		if (mappedChildren.length) mappedNode.children = mappedChildren

		mappedNodes.push(mappedNode)
	}

	return mappedNodes
}
