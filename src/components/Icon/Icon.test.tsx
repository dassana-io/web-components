import React from 'react'
import Icon, { IconProps } from '.'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

describe('Predefined Icon', () => {
	const mockProps: IconProps = {
		height: 64,
		iconKey: 'dassana-blue'
	}

	beforeEach(() => {
		wrapper = mount(<Icon {...mockProps} />)
	})

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
