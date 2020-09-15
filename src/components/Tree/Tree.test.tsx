import { processTreeData } from './utils'
import React from 'react'
import Tree from './index'
import treeData0 from './fixtures/0_sample_data'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(<Tree treeData={treeData0} />)
})

describe('Tree', () => {
	it('renders', () => {
		const input = wrapper.find(Tree)

		expect(input).toHaveLength(1)
	})
})

describe('utils - processTreeData', () => {
	it('correctly formats tree data', () => {
		const processedData = [
			{
				children: [
					{
						children: [
							{ key: 3, title: 'Prod Account' },
							{ key: 4, title: 'Dev Account' }
						],
						key: 1,
						title: 'Security'
					},
					{
						children: [
							{ key: 5, title: 'Prod Account' },
							{ key: 6, title: 'Dev Account' },
							{ key: 7, title: 'Test Account' }
						],
						key: 2,
						title: 'Infrastructure'
					}
				],
				key: 0,
				title: 'AWS'
			}
		]

		expect(processTreeData(treeData0)).toMatchObject(processedData)
	})

	it('returns an empty array for an empty array argument', () => {
		expect(processTreeData([])).toMatchObject([])
	})
})
