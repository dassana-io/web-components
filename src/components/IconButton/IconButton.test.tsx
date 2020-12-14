import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IconButton, IconSizes } from './index'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper
let mockOnClick: jest.Mock<void>

beforeEach(() => {
	mockOnClick = jest.fn()
	wrapper = mount(<IconButton />)
})

afterEach(() => {
	wrapper.unmount()
})

describe('IconButton', () => {
	it('renders', () => {
		const iconBtn = wrapper.find(IconButton)

		expect(iconBtn).toHaveLength(1)
	})

	it('passes onClick props to FontAwesomeIcon if one is provided', () => {
		wrapper = mount(<IconButton onClick={mockOnClick} />)

		expect(wrapper.find(FontAwesomeIcon).props().onClick).toBeTruthy()
	})

	it('runs onClick function when IconButton is clicked', () => {
		wrapper = mount(<IconButton onClick={mockOnClick} />)

		const fontAwesomeIcon = wrapper.find(FontAwesomeIcon)

		fontAwesomeIcon.simulate('click')
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	it('inherits fontSize if size prop is not provided', () => {
		const styles = window.getComputedStyle(wrapper.find('svg').getDOMNode())

		expect(styles.fontSize).toBe('inherit')
	})

	it('renders IconButton with fontSize equal to size if size prop is provided', () => {
		wrapper = mount(<IconButton size={IconSizes.xs} />)

		const styles = window.getComputedStyle(wrapper.find('svg').getDOMNode())

		expect(styles.fontSize).toBe(`${IconSizes.xs}px`)
	})
})
