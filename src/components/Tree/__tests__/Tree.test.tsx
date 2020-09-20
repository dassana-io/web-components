import React from 'react'
import Tree from '../index'
import treeData0 from '../fixtures/0_sample_data'
import TreeSkeleton from '../TreeSkeleton'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'

const mockOnChange = jest.fn()

let wrapper: ReactWrapper | ShallowWrapper

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
		it('calls onChange handler if it is passed as prop and when an item is clicked', () => {
			const treeItem = wrapper
				.find('.ant-tree-treenode')
				.first()
				.find('.ant-tree-node-content-wrapper')

			expect(treeItem).toHaveLength(1)

			treeItem.simulate('click')

			expect(mockOnChange).toHaveBeenCalledTimes(1)
		})

		it('does not call onChange handler if one is not passed as prop', () => {
			const mockOnChange = jest.fn()
			wrapper = mount(<Tree treeData={treeData0} />)

			const treeItem = wrapper
				.find('.ant-tree-treenode')
				.first()
				.find('.ant-tree-node-content-wrapper')

			expect(treeItem).toHaveLength(1)

			treeItem.simulate('click')

			expect(mockOnChange).toBeCalledTimes(0)
		})
	})

	describe('loading', () => {
		it('renders a TreeSkeleton if loading prop is passed as true', () => {
			wrapper = shallow(
				<Tree loading onChange={mockOnChange} treeData={[]} />
			)

			expect(wrapper.find(TreeSkeleton)).toHaveLength(1)
		})
	})
})
