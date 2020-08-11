import React from 'react'
import Table, { TableProps } from './Table'
import { User, tableData } from './Table.stories'
import { shallow, ShallowWrapper } from 'enzyme'

const mockData = tableData

describe('Table', () => {
	it('renders', () => {
		type WrapperType = ShallowWrapper<TableProps<User>>
		const wrapper: WrapperType = shallow(<Table {...mockData} />)
		expect(wrapper).toHaveLength(1)
	})
})
