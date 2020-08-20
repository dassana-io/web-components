import React from 'react'
import Icon, { IconProps } from '.'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper
const mockProps: IconProps = {
	icon: 'dassana-blue',
	size: 64
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

	it('has the correct size', () => {
		expect(wrapper.getDOMNode().getAttribute('height')).toBe('64')
		expect(wrapper.getDOMNode().getAttribute('width')).toBe('64')
	})
})
