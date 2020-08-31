import mockData0 from '../fixtures/0_sample_data'
import mockData3 from '../fixtures/3_sample_data'
import React from 'react'
import Table from '..'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(
		<div>
			<Table {...mockData0} />
		</div>
	)
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

		expect(tableBody.find('tr')).toHaveLength(2)

		tableBody.find('tr').forEach((node, i) => {
			expect(node.find(`tr[data-row-key=${i}]`)).toHaveLength(1)
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
		it('does not renders if search prop is set to false', () => {
			wrapper = mount(
				<div>
					<Table {...mockData0} search={false} />
				</div>
			)
			const table = wrapper.find(Table)
			const searchBar = table.find('input')
			expect(searchBar).toHaveLength(0)
		})
	})

	describe('Table column sort', () => {
		// todo: allow sort for type - component, format - toggle
		it('allows for column sort for each column type by default', () => {
			wrapper = mount(
				<div>
					<Table {...mockData3} />
				</div>
			)
			const table = wrapper.find(Table)
			const sortableCols = table.find('.ant-table-column-has-sorters')
			expect(sortableCols).toHaveLength(5)
		})
	})
})
