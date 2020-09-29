import { processTreeData } from '../utils'
import treeData0 from '../fixtures/0_sample_data'

describe('processTreeData', () => {
	it('returns an object containing correctly formatted tree data and an object mapping keys to tree nodes', () => {
		const processedData = [
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

		expect(processTreeData(treeData0)).toMatchObject(processedData)
	})

	it('returns an empty array if tree data is empty', () => {
		expect(processTreeData([])).toMatchObject([])
	})
})
