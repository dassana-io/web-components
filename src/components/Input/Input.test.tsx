import { Input } from './index'
import { Skeleton } from '../Skeleton'
import { Input as AntDInput, type InputRef } from 'antd'
import { mount, type ReactWrapper, shallow } from 'enzyme'
import React, { createRef } from 'react'

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(<Input />)
})

describe('Input', () => {
	it('renders', () => {
		const input = wrapper.find(Input)

		expect(input).toHaveLength(1)
	})

	it('throws an error if value is passed without an onClick', () => {
		expect(() => shallow(<Input value='abc' />)).toThrow()
	})

	it('should pass onChange and value to the input component if the props exist', () => {
		const mockOnChange = jest.fn()
		wrapper = mount(<Input onChange={mockOnChange} value='abc' />)

		expect(wrapper.find(AntDInput).props().onChange).toEqual(mockOnChange)
		expect(wrapper.find(AntDInput).props().value).toEqual('abc')
	})

	it('correctly passes the disabled prop', () => {
		wrapper = mount(<Input disabled />)

		expect(wrapper.find(AntDInput).props().disabled).toBeTruthy()
	})

	it('correctly passes the ref if one is provided', () => {
		const inputRef = createRef<InputRef>()

		wrapper = mount(<Input inputRef={inputRef} />)

		// @ts-expect-error
		expect(wrapper.find(AntDInput).getElement().ref).toBe(inputRef)
	})

	it('correctly passes the placeholder prop', () => {
		wrapper = mount(<Input placeholder='Testing' />)

		expect(wrapper.find(AntDInput).props().placeholder).toEqual('Testing')
	})

	describe('type', () => {
		it('defaults to type text if no type is specified', () => {
			expect(wrapper.find(AntDInput).props().type).toEqual('text')
		})

		it('correctly passes the input type prop', () => {
			wrapper = mount(<Input type='password' />)

			expect(wrapper.find(AntDInput).props().type).toEqual('password')
		})
	})

	describe('loading', () => {
		it('renders a loading skeleton', () => {
			wrapper = mount(<Input loading />)

			expect(wrapper.find(Skeleton)).toHaveLength(1)
		})
	})

	describe('fullWidth', () => {
		beforeEach(() => {
			// Mounting to document.body throws a React error, so create a temporary container div for the tests to mount the element to
			const div = document.createElement('div')
			div.setAttribute('id', 'container')
			document.body.appendChild(div)
		})

		afterEach(() => {
			const div = document.getElementById('container')

			if (div) {
				document.body.removeChild(div)
			}
		})

		it('renders a container that will span the width of its parent container if set to true', () => {
			wrapper = mount(<Input fullWidth />, {
				attachTo: document.getElementById('container')
			})

			const style = window.getComputedStyle(wrapper.getDOMNode())

			expect(style.width).toEqual('100%')
		})

		it('does not render a container that will span the width of its parent container by default', () => {
			wrapper = mount(<Input />, {
				attachTo: document.getElementById('container')
			})

			const style = window.getComputedStyle(wrapper.getDOMNode())

			expect(style.width).not.toEqual('100%')
		})
	})

	describe('error', () => {
		it('passes the correct error class to input', () => {
			wrapper = mount(<Input error />)

			expect(
				wrapper.getDOMNode().className.includes('error')
			).toBeTruthy()
		})
	})
})
