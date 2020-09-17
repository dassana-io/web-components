import { processTreeData } from './utils'
import React from 'react'
import Tree from './index'
import treeData0 from './fixtures/0_sample_data'
import TreeSkeleton from './TreeSkeleton'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'

let wrapper: ReactWrapper | ShallowWrapper

beforeEach(() => {
	wrapper = mount(<Tree treeData={treeData0} />)
})

describe('Tree', () => {
	it('renders', () => {
		const tree = wrapper.find(Tree)

		expect(tree).toHaveLength(1)
	})

	describe('loading', () => {
		it('renders a TreeSkeleton if loading prop is passed as true', () => {
			wrapper = shallow(<Tree loading />)

			expect(wrapper.find(TreeSkeleton)).toHaveLength(1)
		})
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

describe('TreeSkeleton', () => {
	it('renders', () => {
		wrapper = mount(<TreeSkeleton blockCount={3} />)

		expect(wrapper.find(TreeSkeleton)).toHaveLength(1)
	})
})
