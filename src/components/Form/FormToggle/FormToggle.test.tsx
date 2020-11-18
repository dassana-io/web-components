import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import React from 'react'
import { Toggle } from 'components/Toggle'
import FormToggle, { FormToggleProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({ foo: true })
	})
}))

let wrapper: ReactWrapper<FormToggleProps>

const mockOnSubmit = jest.fn()

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				initialValues: { foo: true },
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

	it('correctly passes a default value from initial values if it exists', () => {
		expect(wrapper.find(Controller).props().defaultValue).toEqual(true)
	})

	it('correctly passes a default value from initial values if defaultChecked is true', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					initialValues: {},
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormToggle defaultChecked label='foo' name='foo' />
			</FieldContext.Provider>
		)

		expect(wrapper.find(Controller).props().defaultValue).toEqual(true)
	})

	it('should render a Toggle component', () => {
		const mockOnChange = jest.fn()
		const test = {
			onChange: mockOnChange,
			value: true
		} as jest.Mocked<any>

		const toggle = wrapper.find(Controller).invoke('render')!(test)

		expect(toggle.type).toBe(Toggle)

		toggle.props.onChange(true)

		expect(mockOnChange).toHaveBeenCalled()
	})
})
