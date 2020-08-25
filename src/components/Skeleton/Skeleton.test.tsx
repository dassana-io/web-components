import React from 'react'
import { mount, shallow, ShallowWrapper } from 'enzyme'
import Skeleton, { SkeletonProps } from './index'

let wrapper: ShallowWrapper<SkeletonProps>

beforeEach(() => {
	wrapper = shallow(<Skeleton />)
})

describe('Skeleton', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('renders the correct number of rows when passed a count', () => {
		wrapper = shallow(<Skeleton count={5} />)

		expect(wrapper.find('span').length).toEqual(5)
	})

	it('correctly passes custom classes', () => {
		wrapper = shallow(<Skeleton classes={['test']} />)

		expect(wrapper.find('span').props().className).toContain('test')
	})

	describe('conditional CSS properties', () => {
		beforeEach(() => {
			// Mounting to document.body throws a React error, so create a temporary container div for the tests to mount the element to
			const div = document.createElement('div')
			div.setAttribute('id', 'container')
			document.body.appendChild(div)
		})

		afterEach(() => {
			const div = document.getElementById('container')

			if (div) {
				document.body.removeChild(div)
			}
		})

		describe('circle or ellipse', () => {
			it('should have rounded edges', () => {
				const skeleton = mount(
					<Skeleton circle height={100} width={80} />,
					{
						attachTo: document.getElementById('container')
					}
				)

				const style = window.getComputedStyle(skeleton.getDOMNode())

				expect(style.borderRadius).toEqual('50%')
			})
		})

		describe('duration', () => {
			it('should default to 1.2 seconds if no duration is passed', () => {
				const skeleton = mount(<Skeleton />, {
					attachTo: document.getElementById('container')
				})

				const style = window.getComputedStyle(skeleton.getDOMNode())

				expect(style.animation).toContain('1.2')
			})

			it('should correctly pass the duration if one is provided', () => {
				const skeleton = mount(<Skeleton duration={3.2} />, {
					attachTo: document.getElementById('container')
				})

				const style = window.getComputedStyle(skeleton.getDOMNode())

				expect(style.animation).toContain('3.2')
			})
		})

		describe('dimensions', () => {
			it('should span the width of the container by default', () => {
				const skeleton = mount(<Skeleton />, {
					attachTo: document.getElementById('container')
				})

				const style = window.getComputedStyle(skeleton.getDOMNode())

				expect(style.width).toEqual('100%')
			})

			it('should apply width prop if passed in', () => {
				const mockWidth = 250
				const skeleton = mount(<Skeleton width={mockWidth} />, {
					attachTo: document.getElementById('container')
				})

				const style = window.getComputedStyle(skeleton.getDOMNode())

				expect(style.width).toEqual(`${mockWidth}px`)
			})

			it('should span the height of the container by default', () => {
				const skeleton = mount(<Skeleton />, {
					attachTo: document.getElementById('container')
				})

				const style = window.getComputedStyle(skeleton.getDOMNode())

				expect(style.height).toEqual('100%')
			})

			it('should apply height prop if passed in', () => {
				const mockHeight = 250
				const skeleton = mount(<Skeleton height={mockHeight} />, {
					attachTo: document.getElementById('container')
				})

				const style = window.getComputedStyle(skeleton.getDOMNode())

				expect(style.height).toEqual(`${mockHeight}px`)
			})
		})
	})
})
