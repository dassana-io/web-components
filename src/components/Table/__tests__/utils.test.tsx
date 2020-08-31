import mockData0 from '../fixtures/0_sample_data'
import mockData2 from '../fixtures/2_sample_data'
import { mapFilterKeys, processColumns, processData } from '../utils'

describe('processColumns', () => {
	it('returns correctly formatted columns', () => {
		const mockProcessedCols = [
			{
				dataIndex: 'name',
				showSorterTooltip: false,
				sorter: expect.any(Function),
				title: 'Name'
			},
			{
				dataIndex: 'age',
				showSorterTooltip: false,
				sorter: expect.any(Function),
				title: 'Age'
			}
		]

		expect(processColumns(mockData0.columns)).toMatchObject(
			mockProcessedCols
		)
	})
})

describe('processData', () => {
	it('returns correctly formatted data', () => {
		const mockProcessedData = [
			{ _FORMATTED_DATA: [], age: 36, key: 0, name: 'Lorem' },
			{ _FORMATTED_DATA: [], age: 32, key: 1, name: 'Ipsum' }
		]

		const { data, columns } = mockData0
		expect(processData(data, columns)).toMatchObject(mockProcessedData)
	})
})

describe('mapFilterKeys', () => {
	it('returns all column keys that should be searched or filtered on', () => {
		const mockFilteredKeys0 = ['_FORMATTED_DATA', 'name', 'age']
		const mockFilteredKeys2 = [
			'_FORMATTED_DATA',
			'name',
			'start_date',
			['role', 'children'],
			['linked_in', 'children'],
			['company', 'icon'],
			['company', 'iconKey']
		]
		expect(mapFilterKeys(mockData0.columns)).toMatchObject(
			mockFilteredKeys0
		)
		expect(mapFilterKeys(mockData2.columns)).toMatchObject(
			mockFilteredKeys2
		)
	})
})
