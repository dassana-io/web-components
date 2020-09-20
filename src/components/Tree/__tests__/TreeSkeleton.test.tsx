import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import TreeSkeleton, { TreeNodeSkeleton } from '../TreeSkeleton'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		interface Matchers<R> {
			toBeWithinRange(a: number, b: number): R
		}
	}
}

expect.extend({
	toBeWithinRange(received, floor, ceiling) {
		const pass = received >= floor && received <= ceiling
		if (pass) {
			return {
				message: () =>
					`expected ${received} not to be within range ${floor} - ${ceiling}`,
				pass: true
			}
		} else {
			return {
				message: () =>
					`expected ${received} to be within range ${floor} - ${ceiling}`,
				pass: false
			}
		}
	}
})

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(<TreeSkeleton blockCount={3} treeNodeCount={3} />)
})

describe('TreeSkeleton', () => {
	it('renders', () => {
		expect(wrapper.find(TreeSkeleton)).toHaveLength(1)
	})

	it('correctly passes blockCount and treeNodeCount props', () => {
		const skeletonProps = wrapper.find(TreeSkeleton).props()

		expect(skeletonProps.blockCount).toEqual(3)
		expect(skeletonProps.treeNodeCount).toEqual(3)
	})

	it('renders correct number of SkeletonTreeNodes within range', () => {
		expect(wrapper.find(TreeNodeSkeleton).length).toBeWithinRange(9, 15)
	})
})
