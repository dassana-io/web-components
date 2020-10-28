import { act } from 'react-dom/test-utils'
import moment from 'moment'
import React from 'react'
import { Input as AntDInput, Table as AntDTable } from 'antd'
import mockData, { DataType, dateFormat } from '__mocks__/table_mock_data'
import mockData0, { Person } from '../fixtures/0_sample_data'
import { mount, ReactWrapper } from 'enzyme'
import { Table, TableProps } from '..'

/* Helper functions */
export function createTable<DataType>(tableProps: TableProps<DataType>) {
	return (
		<div>
			<Table<DataType> {...tableProps} />
		</div>
	)
}

export function renderedData(wrapper: ReactWrapper, dataIndex = '') {
	const bodyRow = wrapper.find('BodyRow')

	if (dataIndex) {
		// @ts-ignore
		return bodyRow.map(row => row.props().record[dataIndex])
	} else {
		// @ts-ignore
		return bodyRow.map(row => row.props().record)
	}
}

interface FormatDateParams {
	displayFormat?: string
	fromNow?: boolean
	unixTS: number
}

export function formatDate({
	unixTS,
	displayFormat = '',
	fromNow = false
}: FormatDateParams) {
	return fromNow
		? moment(unixTS).fromNow()
		: moment(unixTS).format(displayFormat)
}

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(createTable<Person>(mockData0))
})

afterEach(() => {
	wrapper.unmount()
})

describe('Table', () => {
	it('renders', () => {
		const table = wrapper.find(Table)

		expect(table).toHaveLength(1)
	})

	it('renders table with a table header and a table body', () => {
		const table = wrapper.find(Table),
			tableHead = table.find('thead'),
			tableBody = table.find('tbody')

		expect(tableHead).toHaveLength(1)
		expect(tableBody).toHaveLength(1)
	})

	it('renders table rows with react keys if IDs are not provided in data objects', () => {
		const table = wrapper.find(Table),
			tableBody = table.find('tbody')

		expect(tableBody.find('tr')).toHaveLength(5)

		tableBody.find('tr').forEach((node, i) => {
			expect(node.find(`tr[data-row-key=${i}]`)).toHaveLength(1)
		})
	})

	it('renders all types and formats of data', () => {
		wrapper = mount(createTable<DataType>(mockData))
		const expected = {
			_FORMATTED_DATA: [
				formatDate({
					displayFormat: dateFormat,
					unixTS: 1599193037581
				}),
				'1KB'
			],
			byte: 1024,
			date: 1599193037581,
			icon: 'test',
			icon_key: 'dassana',
			key: 0,
			link: 'test',
			number: 0,
			string: 'Dassana',
			tag: 'typescript',
			toggle: false
		}

		expect(expected).toMatchObject(renderedData(wrapper)[0])
	})
})

describe('Table props', () => {
	it('passes required props data and columns', () => {
		const table = wrapper.find(Table)

		expect(table.props().data).not.toBeFalsy()
		expect(table.props().columns).not.toBeFalsy()
	})

	it('passes correct data prop and correct columns prop', () => {
		const table = wrapper.find(Table)

		expect(table.props().data).toEqual(
			expect.arrayContaining(mockData0.data)
		)
		expect(table.props().columns).toEqual(
			expect.arrayContaining(mockData0.columns)
		)
	})
})

describe('Table search and searchProps', () => {
	it('renders by default', () => {
		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		expect(searchBar).toHaveLength(1)
	})

	it('does not render if search prop is set to false', () => {
		wrapper = mount(
			createTable<Person>({ ...mockData0, search: false })
		)

		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		expect(searchBar).toHaveLength(0)
	})

	it('only renders rows that have the matching input value', async () => {
		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		searchBar.simulate('change', { target: { value: 'lo' } })
		await act(() => new Promise(r => setTimeout(r, 250)))
		wrapper.update()

		expect(renderedData(wrapper)).toHaveLength(2)
	})

	it('it renders the search bar to the left by default', async () => {
		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		const style = window.getComputedStyle(searchBar.getDOMNode())

		expect(style.alignSelf).toBe('flex-start')
	})

	it('it renders the search bar to the right if searchProps.placement is passed as right', async () => {
		wrapper = mount(
			createTable<DataType>({
				...mockData,
				searchProps: { placement: 'right' }
			})
		)

		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		const style = window.getComputedStyle(searchBar.getDOMNode())

		expect(style.alignSelf).toBe('flex-end')
	})

	it('correctly passes the placeholder prop to the searchbar input', () => {
		wrapper = mount(
			createTable<DataType>({
				...mockData,
				searchProps: { placeholder: 'Mock placeholder' }
			})
		)

		expect(wrapper.find(AntDInput).props().placeholder).toEqual(
			'Mock placeholder'
		)
	})
})

describe('Table onRowClick', () => {
	it('calls onRowClick handler when a table row is clicked', () => {
		const mockOnRowClick = jest.fn()

		wrapper = mount(
			createTable<Person>({ ...mockData0, onRowClick: mockOnRowClick })
		)

		const tableRow = wrapper.find('tbody').find('tr').at(1)

		tableRow.simulate('click')
		expect(mockOnRowClick).toHaveBeenCalledTimes(1)
	})

	it('does not pass an onRow prop if onRowClick prop does not exist', () => {
		expect(wrapper.find(AntDTable).props().onRow).toBeFalsy()
	})
})
