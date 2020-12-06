import { act } from 'react-dom/test-utils'
import FieldContext from './FieldContext'
import FormSubmitButton from './FormSubmitButton'
import { UseFormMethods } from 'react-hook-form'
import { Form, FormProps } from './index'
import { mount, shallow, ShallowWrapper } from 'enzyme'
import React, { BaseSyntheticEvent, createRef } from 'react'

const mockPreventDefault = jest.fn()
const mockHandleSubmit = (
	fn: (data: Record<string, any>, event: BaseSyntheticEvent) => void
) => fn({}, { preventDefault: mockPreventDefault } as any)

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	useForm: () => ({
		getValues: mockGetValues,
		handleSubmit: mockHandleSubmit,
		reset: mockReset
	}),
	useFormContext: () => ({
		formState: {
			isDirty: true
		},
		handleSubmit: mockHandleSubmit
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

afterEach(() => {
	jest.resetAllMocks()
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
				loading: false,
				onSubmit: mockOnSubmit
			}
		)
	})

	it('prevents event default on form submit', () => {
		const mountedForm = mount(
			<Form onSubmit={mockOnSubmit}>
				<FormSubmitButton>Submit</FormSubmitButton>
			</Form>
		)

		mountedForm.find('form').simulate('submit')

		expect(mockPreventDefault).toHaveBeenCalled()
		expect(mockOnSubmit).toHaveBeenCalled()
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
