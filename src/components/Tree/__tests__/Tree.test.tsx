import { Tree as AntDTree } from 'antd'
import React from 'react'
import { Tree } from '../index'
import treeData0 from '../fixtures/0_sample_data'
import TreeSkeleton from '../TreeSkeleton'
import { mount, type ReactWrapper, shallow, type ShallowWrapper } from 'enzyme'

/* Helper functions */
function getTreeNode (wrapper: ReactWrapper) {
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

	describe('props', () => {
		it('correctly passes treeData and onChange props if the props exist', () => {
			const treeProps = wrapper.find(Tree).props()

			expect(treeProps.treeData).toMatchObject(treeData0)
			expect(treeProps.onChange).toEqual(mockOnChange)
		})

		it('throws an error if passed skeletonBlockCount prop is less than 1', () => {
			expect(() =>
				shallow(<Tree skeletonBlockCount={0} treeData={treeData0} />)
			).toThrow()
		})

		it('throws an error if passed skeletonTreeNodeCount prop is less than 1', () => {
			expect(() =>
				shallow(<Tree skeletonTreeNodeCount={0} treeData={treeData0} />)
			).toThrow()
		})
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

		it('does not pass an onCheck prop if onChange prop does not exist', () => {
			wrapper = mount(<Tree treeData={treeData0} />)
			const treeNode = getTreeNode(wrapper)

			expect(treeNode).toHaveLength(1)

			expect(wrapper.find(AntDTree).props().onCheck).toBeUndefined()
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
