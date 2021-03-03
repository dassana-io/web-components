import React from 'react'
import { mount, shallow, ShallowWrapper } from 'enzyme'
import { TabConfig, Tabs } from '../index'

let wrapper: ShallowWrapper

const mockTabConfig: TabConfig[] = [
	{
		key: 'mock1',
		label: 'mock1',
		render: () => <>Mock Tab Pane 1</>
	},
	{
		key: 'mock2',
		label: 'mock2',
		render: () => <>Mock Tab Pane 2</>
	}
]

beforeEach(() => {
	wrapper = shallow(<Tabs tabConfig={mockTabConfig} />)
})

describe('Tabs', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	describe('defaultActiveIndex', () => {
		it('does not throw an error if non-existent index is passed for defaultActiveIndex', () => {
			expect(() => {
				mount(
					<Tabs defaultActiveIndex={-1} tabConfig={mockTabConfig} />
				)
			}).not.toThrow()
		})
	})
})
