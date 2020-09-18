import React from 'react'
import Tree from '../index'
import treeData0 from '../fixtures/0_sample_data'
import TreeSkeleton from '../TreeSkeleton'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'

const mockOnCheck = jest.fn()

let wrapper: ReactWrapper | ShallowWrapper

beforeEach(() => {
	wrapper = mount(<Tree onCheck={mockOnCheck} treeData={treeData0} />)
})

describe('Tree', () => {
	it('renders', () => {
		const tree = wrapper.find(Tree)

		expect(tree).toHaveLength(1)
	})

	it('correctly passes treeData props if the props exist', () => {
		expect(wrapper.find(Tree).props().treeData).toMatchObject(treeData0)
	})

	it('calls onCheck handler when an item is clicked', () => {
		const treeItem = wrapper
			.find('.ant-tree-treenode')
			.first()
			.find('.ant-tree-node-content-wrapper')

		expect(treeItem).toHaveLength(1)

		treeItem.simulate('click')

		expect(mockOnCheck).toHaveBeenCalledTimes(1)
	})

	describe('loading', () => {
		it('renders a TreeSkeleton if loading prop is passed as true', () => {
			wrapper = shallow(<Tree loading />)

			expect(wrapper.find(TreeSkeleton)).toHaveLength(1)
		})
	})
})
