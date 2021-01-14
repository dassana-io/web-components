import React from 'react'
import { IconButton, IconSizes } from './index'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper
let mockOnClick: jest.Mock<void>

beforeEach(() => {
	mockOnClick = jest.fn()
	wrapper = mount(<IconButton onClick={mockOnClick} />)
})

afterEach(() => {
	jest.clearAllMocks()
	wrapper.unmount()
})

describe('IconButton', () => {
	it('renders', () => {
		const iconBtn = wrapper.find(IconButton)

		expect(iconBtn).toHaveLength(1)
	})

	it('passes onClick props to FontAwesomeIcon', () => {
		expect(wrapper.find(IconButton).props().onClick).toBeTruthy()
	})

	it('runs onClick function when IconButton is clicked', () => {
		const iconBtn = wrapper.find(IconButton)

		iconBtn.simulate('click')
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	it('inherits fontSize if size prop is not provided', () => {
		const styles = window.getComputedStyle(wrapper.find('svg').getDOMNode())

		expect(styles.fontSize).toBe('inherit')
	})

	it('renders IconButton with fontSize equal to size if size prop is provided', () => {
		wrapper = mount(
			<IconButton onClick={mockOnClick} size={IconSizes.xs} />
		)

		const styles = window.getComputedStyle(wrapper.find('svg').getDOMNode())

		expect(styles.fontSize).toBe(`${IconSizes.xs}px`)
	})
})
