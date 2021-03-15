import mockData from '__mocks__/table_mock_data'
import React from 'react'
import { TableCtxProvider } from '../TableContext'
import { TableSkeleton } from '../TableSkeleton'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(
		<TableCtxProvider value={{ isMobile: false }}>
			<TableSkeleton columns={mockData.columns} rowCount={5} />
		</TableCtxProvider>
	)
})

describe('TableSkeleton', () => {
	it('renders', () => {
		expect(wrapper.find(TableSkeleton)).toHaveLength(1)
	})

	it('renders correct number of skeleton Table rows', () => {
		const tBody = wrapper.find(TableSkeleton).find('tbody')

		expect(tBody.find('tr')).toHaveLength(5)
	})
})
