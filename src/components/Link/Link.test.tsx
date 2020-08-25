import React from 'react'
import Link, { LinkProps } from '.'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper
let mockClick: jest.Mock<void>
let mockProps: LinkProps

describe('Link with href', () => {
	beforeEach(() => {
		mockProps = {
			children: 'Test',
			href: '/test',
			target: '_blank'
		}

		wrapper = mount(<Link {...mockProps} />)
	})

	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('has the correct href attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('href')).toBe(mockProps.href)
	})

	it('has the correct target attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('target')).toBe(
			mockProps.target
		)
	})

	it('has a default target of _self if none is passed in', () => {
		wrapper = mount(<Link onClick={mockClick}>Test</Link>)

		expect(wrapper.getDOMNode().getAttribute('target')).toBe('_self')
	})
})

describe('Link', () => {
	beforeEach(() => {
		mockClick = jest.fn()

		mockProps = {
			children: 'Test',
			onClick: mockClick,
			target: '_blank'
		}

		wrapper = mount(<Link {...mockProps} />)
	})

	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('calls onClick function when link is clicked', () => {
		wrapper.simulate('click')
		expect(mockClick).toHaveBeenCalledTimes(1)
	})

	it('has the correct target attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('target')).toBe(
			mockProps.target
		)
	})
})
