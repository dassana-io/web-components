import React from 'react'
import Tree from '../index'
import treeData0 from '../fixtures/0_sample_data'
import TreeSkeleton from '../TreeSkeleton'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'

/* Helper functions */
function getTreeNode(wrapper: ReactWrapper) {
	return wrapper
		.find('.ant-tree-treenode')
		.find('.ant-tree-node-content-wrapper')
		.at(0)
}
/* --------------------------------------- */

const mockOnChange = jest.fn()

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(<Tree onChange={mockOnChange} treeData={treeData0} />)
})

describe('Tree', () => {
	it('renders', () => {
		const tree = wrapper.find(Tree)

		expect(tree).toHaveLength(1)
	})

	it('correctly passes treeData and onChange props if the props exist', () => {
		const treeProps = wrapper.find(Tree).props()

		expect(treeProps.treeData).toMatchObject(treeData0)
		expect(treeProps.onChange).toEqual(mockOnChange)
	})

	describe('onChange', () => {
		it('calls onChange handler when a tree node is clicked', () => {
			const treeNode = getTreeNode(wrapper)

			expect(treeNode).toHaveLength(1)

			treeNode.simulate('click')

			expect(mockOnChange).toHaveBeenCalledTimes(1)
		})

		it('calls onChange handler with correct arguments when a tree node is clicked', () => {
			const mockArgs = [3, 4, 5, 6, 7]
			const treeNode = getTreeNode(wrapper)

			expect(treeNode).toHaveLength(1)

			treeNode.simulate('click')

			expect(mockOnChange).toHaveBeenCalledWith(mockArgs)
		})

		it('does not call onChange handler if one is not passed as a prop', () => {
			wrapper = mount(<Tree treeData={treeData0} />)
			const mockOnChange = jest.fn()
			const treeNode = getTreeNode(wrapper)

			expect(treeNode).toHaveLength(1)

			treeNode.simulate('click')

			expect(mockOnChange).toBeCalledTimes(0)
		})
	})

	describe('loading', () => {
		it('renders a TreeSkeleton if loading prop is passed as true', () => {
			const wrapper: ShallowWrapper = shallow(
				<Tree loading onChange={mockOnChange} treeData={[]} />
			)

			expect(wrapper.find(TreeSkeleton)).toHaveLength(1)
		})
	})
})
