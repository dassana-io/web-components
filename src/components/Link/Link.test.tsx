import React from 'react'
import Link, { LinkProps } from '.'
import { mount, ReactWrapper, shallow } from 'enzyme'

let wrapper: ReactWrapper
let mockClick: jest.Mock<void>
<<<<<<< HEAD
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
=======
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
>>>>>>> Feat #43 - Tag, Link components
	})

	it('throws an error if both onClick and href props are undefined', () => {
		expect(() => shallow(<Link>Test</Link>)).toThrow()
	})
})
