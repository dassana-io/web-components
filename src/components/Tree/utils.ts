import { DataNode } from 'antd/es/tree'
import { TreeNodesHash, TreeNodeType } from '.'

/**
 * Recursive function to process TreeData. It takes an array of nested TreeNodes and returns array of nested DataNodes formatted to satisfy antD requirements.
 */
export const processTreeData = (nodes: TreeNodeType[] | undefined) => {
	const treeNodeHash: TreeNodesHash = {}

	const mapTreeNodes = (nodes: TreeNodeType[] | undefined) => {
		if (!nodes) return []

		const mappedNodes = []

		for (const node of nodes) {
			const mappedNode: DataNode = { key: node.id, title: node.name }

			treeNodeHash[node.id] = node

			const mappedChildren = mapTreeNodes(node.children)

			if (mappedChildren.length) mappedNode.children = mappedChildren

			mappedNodes.push(mappedNode)
		}

		return mappedNodes
	}

	return { mappedTreeData: mapTreeNodes(nodes), treeNodeHash }
}

export interface MapOnCheckArgsParams {
	checked: (string | number)[]
	info: Record<string, any>
	treeNodeHash: TreeNodesHash
}

export const mapOnCheckArgs = ({
	checked,
	info,
	treeNodeHash
}: MapOnCheckArgsParams) => ({
	checked: info.checked,
	checkedKeys: checked,
	checkedNode: treeNodeHash[info.node.key],
	checkedNodes: checked.map(item => treeNodeHash[item])
})
