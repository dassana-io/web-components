import { type TreeNodeType } from '../'

const treeData: TreeNodeType[] = [
	{
		children: [
			{
				children: [
					{
						id: 3,
						name: 'Prod Account'
					},
					{
						id: 4,
						name: 'Dev Account'
					}
				],
				id: 1,
				name: 'Security'
			},
			{
				children: [
					{
						id: 5,
						name: 'Prod Account'
					},
					{
						id: 6,
						name: 'Dev Account'
					},
					{
						id: 7,
						name: 'Test Account'
					}
				],
				id: 2,
				name: 'Infrastructure'
			}
		],
		id: 0,
		name: 'AWS'
	}
]

export default treeData
