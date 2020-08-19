import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import Toggle, { ToggleProps } from '.'

let wrapper: ReactWrapper
const mockProps: ToggleProps = {
	defaultChecked: false
}

beforeEach(() => {
	wrapper = mount(<Toggle {...mockProps} />)
})

describe('Toggle', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('has the correct role attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('role')).toBe('switch')
	})

	it('has the correct aria-checked attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('aria-checked')).toBe('false')
	})

	it('changes the aria-checked attribute when it is clicked', () => {
		wrapper.simulate('click')
		expect(wrapper.getDOMNode().getAttribute('aria-checked')).toBe('true')
	})
})
