import React from 'react'
import { Icon, IconProps } from '.'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

describe('Predefined Icon', () => {
	const mockProps: IconProps = {
		height: 64,
		iconKey: 'dassana'
	}

	beforeEach(() => {
		wrapper = mount(<Icon {...mockProps} />)
	})

	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('has the correct height', () => {
		expect(wrapper.getDOMNode().getAttribute('height')).toBe('64')
	})

	it('renders with a default height of 32', () => {
		wrapper = mount(<Icon iconKey='dassana' />)

		expect(wrapper.getDOMNode().getAttribute('height')).toBe('32')
	})

	it('correctly applies the color prop if one is provided', () => {
		const mockColor = 'blue'
		wrapper = mount(<Icon color={mockColor} iconKey='dassana' />)

		expect(wrapper.getDOMNode().getAttribute('fill')).toBe(mockColor)
	})
})

describe('Custom Icon', () => {
	const mockProps: IconProps = {
		height: 64,
		icon: 'https://dummyimage.com/600x400/000/fff&text=Dassana'
	}

	beforeEach(() => {
		wrapper = mount(<Icon {...mockProps} />)
	})

	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('renders with correct src url', () => {
		expect(wrapper.getDOMNode().getAttribute('src')).toBe(
			'https://dummyimage.com/600x400/000/fff&text=Dassana'
		)
	})

	it('has the correct alt attribute', () => {
		expect(wrapper.getDOMNode().getAttribute('alt')).toBe(
			'https://dummyimage.com/600x400/000/fff&text=Dassana'
		)
	})

	it('has the correct height', () => {
		expect(wrapper.getDOMNode().getAttribute('height')).toBe('64')
	})
})
