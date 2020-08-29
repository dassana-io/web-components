import React from 'react'
import Table from '.'
import tableData0 from './fixtures/0_sample_data'
import { mount, ReactWrapper } from 'enzyme'

const mockData = tableData0
let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(
		<div>
			<Table {...mockData} />
		</div>
	)
})

describe('Table', () => {
	it('renders', () => {
		const table = wrapper.find(Table)
		expect(table).toHaveLength(1)
	})

	it('renders table rows with react keys', () => {
		const table = wrapper.find(Table),
			tableBody = table.find('tbody')

		expect(tableBody).toHaveLength(1)

		tableBody.forEach((node, i) => {
			expect(node.find(`tr[data-row-key=${i}]`)).toHaveLength(1)
		})
	})
})
