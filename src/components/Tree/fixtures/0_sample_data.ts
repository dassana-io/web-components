import { type DataNode } from '../'

const treeData: DataNode[] = [
	{
		children: [
			{
				children: [
					{
						key: 3,
						title: 'Prod Account'
					},
					{
						key: 4,
						title: 'Dev Account'
					}
				],
				key: 1,
				title: 'Security'
			},
			{
				children: [
					{
						key: 5,
						title: 'Prod Account'
					},
					{
						key: 6,
						title: 'Dev Account'
					},
					{
						key: 7,
						title: 'Test Account'
					}
				],
				key: 2,
				title: 'Infrastructure'
			}
		],
		key: 0,
		title: 'AWS'
	}
]

export default treeData
