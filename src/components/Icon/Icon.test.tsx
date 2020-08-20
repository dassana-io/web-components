import React from 'react'
import Icon, { IconProps } from '.'
import { mount, ReactWrapper, shallow } from 'enzyme'

let wrapper: ReactWrapper
const mockProps: IconProps = {
	height: 64,
	iconKey: 'dassana-blue'
}

beforeEach(() => {
	wrapper = mount(<Icon {...mockProps} />)
})

describe('Icon', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('renders with correct src url', () => {
		expect(wrapper.getDOMNode().getAttribute('src')).toContain(
			'dassana-blue'
		)
	})

	it('has the correct alt attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('alt')).toBe('dassana-blue')
	})

	it('has the correct height', () => {
		expect(wrapper.getDOMNode().getAttribute('height')).toBe('64')
	})

	it('throws an error if both icon and iconType props are undefined', () => {
		expect(() => shallow(<Icon />)).toThrow()
	})
})
