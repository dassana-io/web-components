import { DataNode } from 'antd/es/tree'
import { TreeDataType } from '.'

export function processTreeData(nodes: TreeDataType[] | undefined) {
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
