import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import React from 'react'
import FormInput, { FormInputProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({ foo: true })
	})
}))

let wrapper: ReactWrapper<FormInputProps>

const mockOnSubmit = jest.fn()

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				initialValues: { foo: 'bar' },
				loading: true,
				onSubmit: mockOnSubmit
			}}
		>
			<FormInput name='foo' />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormInput', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('correctly passes a default value from initial values if it exists', () => {
		expect(wrapper.find(Controller).props().defaultValue).toEqual('bar')
	})

	it('correctly passes validation rules if required', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					initialValues: {},
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormInput name='foo' required />
			</FieldContext.Provider>
		)

		expect(wrapper.find(Controller).props().rules).toMatchObject({
			required: true
		})
	})
})
