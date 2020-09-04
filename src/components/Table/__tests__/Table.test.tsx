import { act } from 'react-dom/test-utils'
import React from 'react'
import mockData0, { Person } from '../fixtures/0_sample_data'
import { mount, ReactWrapper } from 'enzyme'
import Table, { TableProps } from '..'

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

	it('renders table rows with react keys', () => {
		const table = wrapper.find(Table),
			tableBody = table.find('tbody')

		expect(tableBody.find('tr')).toHaveLength(4)

		tableBody.find('tr').forEach((node, i) => {
			expect(node.find(`tr[data-row-key=${i}]`)).toHaveLength(1)
		})
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

describe('Table search', () => {
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
})
