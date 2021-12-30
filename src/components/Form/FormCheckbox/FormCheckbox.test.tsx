import { Checkbox } from 'components/Checkbox'
import { Controller } from 'react-hook-form'
import { defaultFieldWidth } from 'components/assets/styles/styleguide'
import FieldContext from '../FieldContext'
import React from 'react'
import FormCheckbox, { FormCheckboxProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({ foo: true })
	})
}))

let wrapper: ReactWrapper<FormCheckboxProps>

const mockOnSubmit = jest.fn()

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				loading: true,
				onSubmit: mockOnSubmit
			}}
		>
			<FormCheckbox label='foo' name='foo' />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormCheckbox', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('should render a Checkbox component', () => {
		const mockOnChange = jest.fn()
		const test = {
			field: {
				onChange: mockOnChange,
				value: true
			}
		} as jest.Mocked<any>

		const checkbox = wrapper.find(Controller).invoke('render')!(test)

		expect(checkbox.type).toBe(Checkbox)

		checkbox.props.onChange({ target: { checked: true } })

		expect(mockOnChange).toHaveBeenCalled()
	})

	it('renders component with max-width of defaultFieldWith if fullWidth is not passed as true', () => {
		const div = document.createElement('div')
		div.setAttribute('id', 'container')
		document.body.appendChild(div)

		wrapper = mount(
			<FieldContext.Provider
				value={{
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormCheckbox
					defaultChecked
					label='label that will wrap for width less than or equal to defaultWidthWidth'
					name='foo'
				/>
			</FieldContext.Provider>,
			{
				attachTo: document.getElementById('container')
			}
		)

		const style = window.getComputedStyle(
			wrapper.find(FormCheckbox).getDOMNode()
		)

		expect(parseInt(style.maxWidth)).toEqual(parseInt(defaultFieldWidth))
	})

	it('renders component with max-width of 100% if fullWidth is passed as true', () => {
		const div = document.createElement('div')
		div.setAttribute('id', 'container-1')
		document.body.appendChild(div)

		wrapper = mount(
			<FieldContext.Provider
				value={{
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormCheckbox
					defaultChecked
					fullWidth
					label='label that will wrap for width less than or equal to defaultWidthWidth'
					name='foo'
				/>
			</FieldContext.Provider>,
			{
				attachTo: document.getElementById('container-1')
			}
		)

		const style = window.getComputedStyle(
			wrapper.find(FormCheckbox).getDOMNode()
		)

		expect(style.maxWidth).toEqual('100%')
	})
})
