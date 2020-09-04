import mockData0 from '../fixtures/0_sample_data'
import mockData1 from '../fixtures/1_sample_data'
import mockData2 from '../fixtures/2_sample_data'
import { ColumnFormats, ColumnType, ColumnTypes } from '..'
import {
	createByteFormatter,
	createDateFormatter,
	mapFilterKeys,
	processColumns,
	processData
} from '../utils'

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
			{
				_FORMATTED_DATA: ['1MB', 'Aug 25, 2020 5:11 PM', null],
				created_at: 1598400668681,
				data_size: 1048576,
				file_name: 'IMG_4542.jpeg',
				key: 0
			},
			{
				_FORMATTED_DATA: ['1.91MB', 'Feb 21, 2020 4:07 PM', null],
				created_at: 1582330066861,
				data_size: 1998576,
				file_name: 'test_123.png',
				key: 1
			},
			{
				_FORMATTED_DATA: [
					'1KB',
					'Mar 21, 2019 7:51 PM',
					'Feb 21, 2020 4:07 PM'
				],
				created_at: 1553223066861,
				data_size: 1024,
				file_name: 'passwords.txt',
				key: 2,
				updated_at: 1582330063211
			},
			{
				_FORMATTED_DATA: ['4MB', 'Nov 18, 2017 8:21 AM', null],
				created_at: 1511022066861,
				data_size: 4194599,
				file_name: 'birthday.mp4',
				key: 3
			},
			{
				_FORMATTED_DATA: [
					'2KB',
					'Jan 3, 2018 3:11 PM',
					'Jan 4, 2018 6:57 PM'
				],
				created_at: 1515021066861,
				data_size: 2048,
				file_name: 'letter.txt',
				key: 4,
				updated_at: 1515121066861
			}
		]

		const { data, columns } = mockData1
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
			['role', 'name'],
			'linked_in',
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

		expect(formattedDate).toEqual('09/03/20')
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
