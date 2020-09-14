import { DataNode } from 'antd/es/tree'
import { TreeDataType } from '.'

function mapTreeNodes(nodes: TreeDataType[] | undefined) {
	if (!nodes) return null

	const mappedNodes = []

	for (const node of nodes) {
		const mappedNode: DataNode = { key: node.id, title: node.name }
		const mappedChildren = mapTreeNodes(node.children)

		if (mappedChildren) mappedNode.children = mappedChildren

		mappedNodes.push(mappedNode)
	}

	return mappedNodes
}

export function processTreeData(treeData: TreeDataType[]): DataNode[] {
	const antDTreeData = mapTreeNodes(treeData)

	return antDTreeData ? antDTreeData : []
}
