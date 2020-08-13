import React from 'react'
import Link, { LinkProps } from '.'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper
let mockClick: jest.Mock<void>
const mockProps: LinkProps = {
	children: 'Test',
	href: '/test',
	target: '_blank'
}

beforeEach(() => {
	mockClick = jest.fn()
	wrapper = mount(<Link {...mockProps} onClick={mockClick} />)
})

describe('Link', () => {
	it('renders', () => {
		const link = wrapper.find(Link)
		expect(link).toHaveLength(1)
	})

	it('calls onClick function when link is clicked', () => {
		const link = wrapper.find(Link)
		link.simulate('click')
		expect(mockClick).toHaveBeenCalledTimes(1)
	})

	it('has the correct href attribute', () => {
		const link = wrapper.find(Link)
		expect(link.getDOMNode().getAttribute('href')).toBe(mockProps.href)
	})

	it('has the correct target attribute', () => {
		const link = wrapper.find(Link)
		expect(link.getDOMNode().getAttribute('target')).toBe(mockProps.target)
	})
})
