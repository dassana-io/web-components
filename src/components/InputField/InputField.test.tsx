import { Input } from 'antd'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import InputField, { InputFieldProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

const mockProps: InputFieldProps = {
	fieldLabel: 'Field Label'
}

beforeEach(() => {
	wrapper = mount(<InputField {...mockProps} />)
})

describe('InputField', () => {
	it('renders', () => {
		const inputField = wrapper.find(InputField)

		expect(inputField).toHaveLength(1)
	})

	it('renders a label if one exists', () => {
		const inputField = wrapper.find(InputField)

		expect(inputField.text()).toContain('Field Label')
	})

	it('throws an error if value is passed without an onClick', () => {
		expect(() => mount(<InputField value='abc' />)).toThrow()
	})

	it('correctly passes the disabled prop', () => {
		wrapper = mount(<InputField disabled />)

		expect(wrapper.find(Input).props().disabled).toBeTruthy()
	})

	it('correctly passes the placeholder prop', () => {
		wrapper = mount(<InputField placeholder='Testing' />)

		expect(wrapper.find(Input).props().placeholder).toEqual('Testing')
	})

	describe('type', () => {
		it('defaults to type text if no type is specified', () => {
			expect(wrapper.find(Input).props().type).toEqual('text')
		})

		it('correctly passes the input type prop', () => {
			wrapper = mount(<InputField type='password' />)

			expect(wrapper.find(Input).props().type).toEqual('password')
		})
	})

	describe('loading', () => {
		it('renders a loading skeleton', () => {
			wrapper = mount(<InputField loading />)

			expect(wrapper.find(Skeleton)).toHaveLength(1)
		})

		it('renders a loading skeleton for the label if there is one', () => {
			wrapper = mount(<InputField fieldLabel='test' loading />)

			expect(wrapper.find(Skeleton)).toHaveLength(2)
		})
	})

	describe('fullWidth', () => {
		beforeEach(() => {
			// Avoid `attachTo: document.body` Warning
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
			wrapper = mount(<InputField fullWidth />, {
				attachTo: document.getElementById('container')
			})

			const element = document.getElementsByClassName(
				wrapper.getDOMNode().className
			)[0]
			const style = window.getComputedStyle(element)

			expect(style.width).toEqual('100%')
		})

		it('does not render a container that will span the width of its parent container by default', () => {
			wrapper = mount(<InputField />, {
				attachTo: document.getElementById('container')
			})

			const element = document.getElementsByClassName(
				wrapper.getDOMNode().className
			)[0]
			const style = window.getComputedStyle(element)

			expect(style.width).not.toEqual('100%')
		})
	})

	describe('required', () => {
		it('passes the correct required class to field label container', () => {
			wrapper = mount(<InputField fieldLabel='Field Label' required />)

			expect(wrapper.getDOMNode().children[0].className).toContain(
				'required'
			)
		})
	})

	describe('error', () => {
		it('passes the correct error class to input', () => {
			wrapper = mount(<InputField error />)

			expect(wrapper.find(Input).hasClass(/error-*/)).toBeTruthy()
		})
	})
})
