import FieldContext from './FieldContext'
import FormSubmitButton from './FormSubmitButton'
import React from 'react'
import { Form, FormProps } from './index'
import { mount, shallow, ShallowWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	useForm: () => ({
		handleSubmit: jest.fn(),
		reset: mockReset
	}),
	useFormContext: () => ({
		formState: {
			isDirty: true
		},
		handleSubmit: jest.fn()
	})
}))

interface MockForm {
	foo: string
}

let wrapper: ShallowWrapper<FormProps<MockForm>>

const mockInitialValues = { foo: 'bar' }
const mockOnSubmit = jest.fn()
const mockReset = jest.fn()

beforeEach(() => {
	wrapper = shallow(
		<Form initialValues={mockInitialValues} onSubmit={mockOnSubmit}>
			<FormSubmitButton>Submit</FormSubmitButton>
		</Form>
	)
})

describe('Form', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('renders children properly', () => {
		expect(wrapper.find(FormSubmitButton)).toHaveLength(1)
	})

	it('passes the correct props to FieldContext provider', () => {
		expect(wrapper.find(FieldContext.Provider).props().value).toMatchObject(
			{
				initialValues: mockInitialValues,
				loading: false,
				onSubmit: mockOnSubmit
			}
		)
	})

	it('correctly defaults initial values to empty object if none is passed in', () => {
		wrapper = shallow(
			<Form onSubmit={mockOnSubmit}>
				<FormSubmitButton>Submit</FormSubmitButton>
			</Form>
		)

		expect(
			wrapper.find(FieldContext.Provider).props().value
		).toMatchObject({ initialValues: {} })
	})

	it('correctly updates initial values', () => {
		const form = mount(
			<Form onSubmit={mockOnSubmit}>
				<FormSubmitButton>Submit</FormSubmitButton>
			</Form>
		)

		form.setProps({ initialValues: mockInitialValues })

		expect(mockReset).toHaveBeenCalledWith(mockInitialValues)
	})
})
