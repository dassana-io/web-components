import React from 'react'
import { mount, type ReactWrapper } from 'enzyme'
import { Toggle, type ToggleProps } from '.'

let wrapper: ReactWrapper
let mockChange: jest.Mock<void>

beforeEach(() => {
	mockChange = jest.fn()

	const mockProps: ToggleProps = {
		checked: false,
		onChange: mockChange
	}

	wrapper = mount(<Toggle {...mockProps} />)
})

describe('Toggle', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('runs onChange function when toggle is clicked', () => {
		expect(wrapper.simulate('click'))
		expect(mockChange).toHaveBeenCalledTimes(1)
	})

	it('has the correct role attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('role')).toBe('switch')
	})

	it('has the correct aria-checked attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('aria-checked')).toBe('false')
	})
})
