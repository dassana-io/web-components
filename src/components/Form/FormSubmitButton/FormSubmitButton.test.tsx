import * as reactHookForm from 'react-hook-form'
import { act } from 'react-dom/test-utils'
import { Button } from 'components/Button'
import FieldContext from '../FieldContext'
import React from 'react'
import FormSubmitButton, { type FormButtonProps } from './index'
import { mount, type ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper<FormButtonProps>

const mockOnSubmit = jest.fn()

const getMockFormContext = (isDirty = true) =>
	({
		formState: {
			isDirty
		},
		getValues: jest.fn() as any,
		handleSubmit: (onSubmit: any) => onSubmit(),
		watch: jest.fn() as any
	} as reactHookForm.UseFormReturn)

const getWrapper = (additionalButtonProps = {}) => (
	<FieldContext.Provider
		value={{
			disabled: false,
			loading: false,
			onSubmit: (_: any) => mockOnSubmit as any
		}}
	>
		<FormSubmitButton {...additionalButtonProps}>Submit</FormSubmitButton>
	</FieldContext.Provider>
)

beforeEach(() => {
	jest.spyOn(reactHookForm, 'useFormContext').mockImplementation(() =>
		getMockFormContext()
	)

	wrapper = mount(getWrapper())
})

afterEach(() => {
	jest.clearAllMocks()
})

describe('FormButton', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('calls onSubmit when clicked', () => {
		wrapper.find(Button).simulate('click')

		expect(mockOnSubmit).toHaveBeenCalled()
	})

	it('calls onSubmit when the Enter key is pressed', () => {
		act(() => {
			dispatchEvent(
				new KeyboardEvent('keydown', {
					code: 'Enter',
					key: 'Enter'
				})
			)
		})

		expect(mockOnSubmit).toHaveBeenCalled()
	})

	it('correctly passes loading from field context', () => {
		expect(wrapper.find(Button).props().loading).toBe(false)
	})

	it('enables the submit button if form is dirty', () => {
		expect(wrapper.find(Button).props().disabled).toBe(false)
	})

	it('disables the submit button if form is pristine', () => {
		jest.spyOn(reactHookForm, 'useFormContext').mockImplementation(() =>
			getMockFormContext(false)
		)

		wrapper = mount(getWrapper())

		expect(wrapper.find(Button).props().disabled).toBe(true)
	})

	it('disables the submit button if isDisabled evaluates to true', () => {
		wrapper = mount(getWrapper({ isDisabled: () => true }))

		expect(wrapper.find(Button).props().disabled).toBe(true)
	})
})
