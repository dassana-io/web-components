import { Controller } from 'react-hook-form'
import { defaultFieldWidth } from 'components/assets/styles/styleguide'
import FieldContext from '../FieldContext'
import React from 'react'
import { Toggle } from 'components/Toggle'
import FormToggle, { type FormToggleProps } from './index'
import { mount, type ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form')),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({ foo: true })
	})
}))

let wrapper: ReactWrapper<FormToggleProps>

const mockOnChange = jest.fn()
const mockChangeEvent = {
	field: {
		onChange: mockOnChange,
		value: true
	}
} as jest.Mocked<any>
const mockOnSubmit = jest.fn()

const getRenderedCmp = (wrapper: ReactWrapper<FormToggleProps>) =>
	wrapper.find(Controller).invoke('render')!(mockChangeEvent)

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				disabled: false,
				loading: true,
				onSubmit: mockOnSubmit
			}}
		>
			<FormToggle label='foo' name='foo' />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormToggle', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('should render a Toggle component', () => {
		const toggle = getRenderedCmp(wrapper)

		expect(toggle.type).toBe(Toggle)

		toggle.props.onChange(true)

		expect(mockOnChange).toHaveBeenCalled()
	})

	it('should be disabled if the form is disabled', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					disabled: true,
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormToggle
					defaultChecked
					label='label that will wrap for width less than or equal to defaultWidthWidth'
					name='foo'
				/>
			</FieldContext.Provider>
		)

		const toggle = getRenderedCmp(wrapper)

		expect(toggle.props.disabled).toBe(true)
	})

	it('renders component with max-width of defaultFieldWith if fullWidth is not passed as true', () => {
		const div = document.createElement('div')
		div.setAttribute('id', 'container')
		document.body.appendChild(div)

		wrapper = mount(
			<FieldContext.Provider
				value={{
					disabled: false,
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormToggle
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
			wrapper.find(FormToggle).getDOMNode()
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
					disabled: false,
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormToggle
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
			wrapper.find(FormToggle).getDOMNode()
		)

		expect(style.maxWidth).toEqual('100%')
	})
})
