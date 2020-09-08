import * as reactHookForm from 'react-hook-form'
import Button from '../../Button'
import FieldContext from '../FieldContext'
import React from 'react'
import FormSubmitButton, { FormButtonProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper<FormButtonProps>

const mockOnSubmit = jest.fn()

const getMockFormContext = (isDirty = true) =>
	({
		formState: {
			isDirty
		},
		handleSubmit: (onSubmit: any) => onSubmit()
	} as reactHookForm.UseFormMethods)

const getWrapper = () => (
	<FieldContext.Provider
		value={{ initialValues: {}, loading: true, onSubmit: mockOnSubmit }}
	>
		<FormSubmitButton>Submit</FormSubmitButton>
	</FieldContext.Provider>
)

beforeEach(() => {
	jest.spyOn(reactHookForm, 'useFormContext').mockImplementation(() =>
		getMockFormContext()
	)

	wrapper = mount(getWrapper())
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormButton', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('calls onSubmit when clicked', () => {
		wrapper.simulate('click')

		expect(mockOnSubmit).toHaveBeenCalledTimes(1)
	})

	it('correctly passes loading from field context', () => {
		expect(wrapper.find(Button).props().loading).toBe(true)
	})

	it('enables the submit button if form is dirty', () => {
		expect(wrapper.find(Button).props().disabled).toBe(false)
	})

	it('disables the submit button if form is pristine', () => {
		jest.clearAllMocks()

		jest.spyOn(reactHookForm, 'useFormContext').mockImplementation(() =>
			getMockFormContext(false)
		)

		wrapper = mount(getWrapper())

		expect(wrapper.find(Button).props().disabled).toBe(true)
	})
})
