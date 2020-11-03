import { act } from 'react-dom/test-utils'
import FieldContext from './FieldContext'
import FormSubmitButton from './FormSubmitButton'
import { UseFormMethods } from 'react-hook-form'
import { Form, FormProps } from './index'
import { mount, shallow, ShallowWrapper } from 'enzyme'
import React, { createRef } from 'react'

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	useForm: () => ({
		getValues: mockGetValues,
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
const mockGetValues = jest.fn()
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

	it('exposes form methods when a ref is passed', () => {
		const formRef = createRef<UseFormMethods>()

		mount(
			<Form formRef={formRef} onSubmit={mockOnSubmit}>
				<FormSubmitButton>Submit</FormSubmitButton>
			</Form>
		)

		act(() => {
			formRef.current?.getValues()
		})

		expect(mockGetValues).toHaveBeenCalled()
	})
})
