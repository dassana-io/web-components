import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { Input } from 'components/Input'
import React from 'react'
import FormInput, { type FormInputProps } from './index'
import { mount, type ReactWrapper } from 'enzyme'

const mockFocus = jest.fn()
const mockClearErrors = jest.fn()

jest.mock('react', () => ({
	...(jest.requireActual('react')),
	useRef: () => ({
		current: {
			focus: mockFocus
		}
	})
}))

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form')),
	Controller: () => <div />,
	useFormContext: () => ({
		clearErrors: mockClearErrors,
		control: jest.fn(),
		formState: {
			errors: { foo: true }
		}
	})
}))

let wrapper: ReactWrapper<FormInputProps>

const mockOnSubmit = jest.fn()
const mockRenderArgs = {
	field: {
		onChange: jest.fn(),
		value: 'abc'
	}
} as jest.Mocked<any>

const getMountedFormInput = (formInputProps: Partial<FormInputProps> = {}) =>
	mount(
		<FieldContext.Provider
			value={{
				disabled: false,
				loading: true,
				onSubmit: mockOnSubmit
			}}
		>
			<FormInput name='foo' required {...formInputProps} />
		</FieldContext.Provider>
	)

beforeEach(() => {
	wrapper = getMountedFormInput()
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormInput', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('should render an Input component', () => {
		const input = wrapper.find(Controller).invoke('render')!(mockRenderArgs)

		expect(input.type).toBe(Input)
	})

	it('renders a label if one is passed in', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					disabled: false,
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormInput label='Field Label' name='foo' />
			</FieldContext.Provider>
		)

		expect(wrapper.find(FieldLabel)).toHaveLength(1)
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
				<FormInput label='Field Label' name='foo' />
			</FieldContext.Provider>
		)

		const input = wrapper.find(Controller).invoke('render')!(mockRenderArgs)

		expect(input.props.disabled).toBe(true)
	})

	it('correctly passes validation rules if required', () => {
		wrapper = getMountedFormInput()

		expect(wrapper.find(Controller).props().rules).toMatchObject({
			required: true
		})
	})

	it('prevents default behavior when enter is pressed within the input', () => {
		const input = wrapper.find(Controller).invoke('render')!(mockRenderArgs)
		const mockPreventDefault = jest.fn()

		input.props.onKeyDown({
			key: 'Enter',
			preventDefault: mockPreventDefault
		})

		expect(mockPreventDefault).toHaveBeenCalled()
	})

	it('does not prevent default behavior when other keys are pressed within the input', () => {
		const input = wrapper.find(Controller).invoke('render')!(mockRenderArgs)
		const mockPreventDefault = jest.fn()

		input.props.onKeyDown({
			key: 'Escape',
			preventDefault: mockPreventDefault
		})

		expect(mockPreventDefault).not.toHaveBeenCalled()
	})

	it('clears errors on focus if there are any', () => {
		wrapper = getMountedFormInput()

		const input = wrapper.find(Controller).invoke('render')!(mockRenderArgs)
		input.props.onFocus()

		expect(mockClearErrors).toHaveBeenCalled()
	})

	it('does not call clearErrors if there are no errors associated with the input', () => {
		wrapper = getMountedFormInput({ name: 'bar' })

		const input = wrapper.find(Controller).invoke('render')!(mockRenderArgs)
		input.props.onFocus()

		expect(mockClearErrors).not.toHaveBeenCalled()
	})
})
