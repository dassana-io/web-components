import { formatDate } from './Table.test'
import mockData2 from '../fixtures/2_sample_data'
import { ColumnFormats, ColumnType, ColumnTypes } from '..'
import {
	createByteFormatter,
	createDateFormatter,
	mapFilterKeys,
	processColumns,
	processData
} from '../utils'
import mockData0, { Person } from '../fixtures/0_sample_data'
import mockData1, { dateFormat0, dateFormat1 } from '../fixtures/1_sample_data'

const mockTableMethods = {
	deleteRow: jest.fn,
	updateRowData: jest.fn
}

describe('mapData', () => {
	it('returns a hash of data items with the item id mapped to the item', () => {
		const mockMappedData = {
			0: {
				age: 36,
				id: 0,
				name: 'Lorem'
			},
			1: {
				age: 32,
				id: 1,
				name: 'Ipsum'
			},
			2: {
				age: 45,
				id: 2,
				name: 'Amet'
			},
			3: {
				age: 50,
				id: 3,
				name: 'Elit'
			},
			4: {
				age: 22,
				id: 4,
				name: 'Dolor'
			}
		}
		expect(
			processData<Person>(mockData0.data, mockData0.columns).mappedData
		).toMatchObject(mockMappedData)
	})
})

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
			},
			{
				dataIndex: 'description',
				showSorterTooltip: false,
				sorter: expect.any(Function),
				title: 'Description'
			}
		]

		expect(
			processColumns(mockData0.columns, mockTableMethods)
		).toMatchObject(mockProcessedCols)
	})
})

describe('processData', () => {
	it('returns correctly formatted data', () => {
		const mockProcessedData = [
			{
				_FORMATTED_DATA: [
					'1MB',
					formatDate({ fromNow: true, unixTS: 1598400668681 }),
					formatDate({
						displayFormat: dateFormat0,
						unixTS: 1598400668681
					}),
					null
				],
				created_at: 1598400668681,
				data_size: 1048576,
				file_name: 'IMG_4542.jpeg',
				key: 0
			},
			{
				_FORMATTED_DATA: [
					'1.91MB',
					formatDate({ fromNow: true, unixTS: 1603779899922 }),
					formatDate({
						displayFormat: dateFormat0,
						unixTS: 1582330066861
					}),
					null
				],
				created_at: 1582330066861,
				data_size: 1998576,
				file_name: 'test_123.png',
				key: 1
			},
			{
				_FORMATTED_DATA: [
					'1KB',
					null,
					formatDate({
						displayFormat: dateFormat0,
						unixTS: 1553223066861
					}),
					formatDate({
						displayFormat: dateFormat1,
						unixTS: 1582330063211
					})
				],
				created_at: 1553223066861,
				data_size: 1024,
				file_name: 'passwords.txt',
				key: 2,
				updated_at: 1582330063211
			},
			{
				_FORMATTED_DATA: [
					'4MB',
					null,
					formatDate({
						displayFormat: dateFormat0,
						unixTS: 1511022066861
					}),
					null
				],
				created_at: 1511022066861,
				data_size: 4194599,
				file_name: 'birthday.mp4',
				key: 3
			},
			{
				_FORMATTED_DATA: [
					'2KB',
					null,
					formatDate({
						displayFormat: dateFormat0,
						unixTS: 1515021066861
					}),
					formatDate({
						displayFormat: dateFormat1,
						unixTS: 1515121066861
					})
				],
				created_at: 1515021066861,
				data_size: 2048,
				file_name: 'letter.txt',
				key: 4,
				updated_at: 1515121066861
			}
		]

		const { data, columns } = mockData1
		expect(processData(data, columns).processedData).toMatchObject(
			mockProcessedData
		)
	})
})

describe('mapFilterKeys', () => {
	it('returns all column keys that should be searched or filtered on', () => {
		const mockFilteredKeys0 = [
			'_FORMATTED_DATA',
			'name',
			'age',
			'description'
		]
		const mockFilteredKeys2 = [
			'_FORMATTED_DATA',
			'name',
			'start_date',
			['role', 'name'],
			'role',
			'linked_in',
			'company',
			'company'
		]

		expect(mapFilterKeys(mockData0.columns)).toMatchObject(
			mockFilteredKeys0
		)
		expect(mapFilterKeys(mockData2.columns)).toMatchObject(
			mockFilteredKeys2
		)
	})
})

describe('createByteFormatter', () => {
	const dateColumn: ColumnType = {
		dataIndex: 'date',
		format: ColumnFormats.date,
		renderProps: {
			displayFormat: 'MM/DD/YY'
		},
		title: 'Date',
		type: ColumnTypes.number
	}

	it('returns function that properly formats number into string date if input column provides valid format pattern', () => {
		const formattedDate = createDateFormatter(dateColumn)(1599193037581)

		expect(formattedDate).toEqual(
			formatDate({ displayFormat: 'MM/DD/YY', unixTS: 1599193037581 })
		)
	})

	it('returns function that returns null if input number is not provided', () => {
		const formattedDate = createDateFormatter(dateColumn)()

		expect(formattedDate).toBeNull()
	})
})

describe('createByteFormatter', () => {
	it('returns function that properly formats number into string bytes if input column provides valid format pattern', () => {
		const formattedDate = createByteFormatter()(1024)

		expect(formattedDate).toEqual('1KB')
	})

	it('returns function that returns null if input number is not provided', () => {
		const formattedDate = createByteFormatter()()

		expect(formattedDate).toBeNull()
	})
})
