import treeData0 from '../fixtures/0_sample_data'
import { mapOnCheckArgs, MapOnCheckArgsParams, processTreeData } from '../utils'

describe('processTreeData', () => {
	it('returns an object containing correctly formatted tree data and an object mapping keys to tree nodes', () => {
		const mappedTreeData = [
			{
				children: [
					{
						children: [
							{ key: 3, title: 'Prod Account' },
							{ key: 4, title: 'Dev Account' }
						],
						key: 1,
						title: 'Security'
					},
					{
						children: [
							{ key: 5, title: 'Prod Account' },
							{ key: 6, title: 'Dev Account' },
							{ key: 7, title: 'Test Account' }
						],
						key: 2,
						title: 'Infrastructure'
					}
				],
				key: 0,
				title: 'AWS'
			}
		]

		const treeNodeHash = {
			0: {
				children: [
					{
						children: [
							{ id: 3, name: 'Prod Account' },
							{ id: 4, name: 'Dev Account' }
						],
						id: 1,
						name: 'Security'
					},
					{
						children: [
							{ id: 5, name: 'Prod Account' },
							{ id: 6, name: 'Dev Account' },
							{ id: 7, name: 'Test Account' }
						],
						id: 2,
						name: 'Infrastructure'
					}
				],
				id: 0,
				name: 'AWS'
			},
			1: {
				children: [
					{ id: 3, name: 'Prod Account' },
					{ id: 4, name: 'Dev Account' }
				],
				id: 1,
				name: 'Security'
			},
			2: {
				children: [
					{ id: 5, name: 'Prod Account' },
					{ id: 6, name: 'Dev Account' },
					{ id: 7, name: 'Test Account' }
				],
				id: 2,
				name: 'Infrastructure'
			},
			3: { id: 3, name: 'Prod Account' },
			4: { id: 4, name: 'Dev Account' },
			5: { id: 5, name: 'Prod Account' },
			6: { id: 6, name: 'Dev Account' },
			7: { id: 7, name: 'Test Account' }
		}

		const processedData = {
			mappedTreeData,
			treeNodeHash
		}

		expect(processTreeData(treeData0)).toMatchObject(processedData)
	})

	it('returns an object containing an empty array and empty object for an empty array argument', () => {
		const processedData = {
			mappedTreeData: [],
			treeNodeHash: {}
		}

		expect(processTreeData([])).toMatchObject(processedData)
	})
})

describe('mapOnCheckArgs', () => {
	const args: MapOnCheckArgsParams = {
		checked: [0],
		info: { checked: true, node: { key: 0, title: 'Lorem' } },
		treeNodeHash: {
			0: { id: 0, name: 'Lorem' },
			1: { id: 1, name: 'Ipsum' }
		}
	}

	const mappedArgs = {
		checked: true,
		checkedKeys: [0],
		checkedNode: { id: 0, name: 'Lorem' },
		checkedNodes: [{ id: 0, name: 'Lorem' }]
	}

	it('correctly maps onCheck args', () => {
		expect(mapOnCheckArgs(args)).toMatchObject(mappedArgs)
	})
})
