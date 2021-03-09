import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { Input } from 'components/Input'
import React from 'react'
import { Controller, InputState } from 'react-hook-form'
import FormInput, { FormInputProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

const mockFocus = jest.fn()
const mockClearErrors = jest.fn()
const mockInputState = {} as InputState

jest.mock('react', () => ({
	...(jest.requireActual('react') as {}),
	useRef: () => ({
		current: {
			focus: mockFocus
		}
	})
}))

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	Controller: () => <div />,
	useFormContext: () => ({
		clearErrors: mockClearErrors,
		control: jest.fn(),
		errors: { foo: true }
	})
}))

let wrapper: ReactWrapper<FormInputProps>

const mockOnSubmit = jest.fn()
const mockRenderArgs = {
	onChange: jest.fn(),
	value: 'abc'
} as jest.Mocked<any>

const getMountedFormInput = (formInputProps: Partial<FormInputProps> = {}) =>
	mount(
		<FieldContext.Provider
			value={{
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
		const input = wrapper.find(Controller).invoke('render')!(
			mockRenderArgs,
			mockInputState
		)

		expect(input.type).toBe(Input)
	})

	it('renders a label if one is passed in', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormInput label='Field Label' name='foo' />
			</FieldContext.Provider>
		)

		expect(wrapper.find(FieldLabel)).toHaveLength(1)
	})

	it('correctly passes validation rules if required', () => {
		wrapper = getMountedFormInput()

		expect(wrapper.find(Controller).props().rules).toMatchObject({
			required: true
		})
	})

	it('prevents default behavior when enter is pressed within the input', () => {
		const input = wrapper.find(Controller).invoke('render')!(
			mockRenderArgs,
			mockInputState
		)
		const mockPreventDefault = jest.fn()

		input.props.onKeyDown({
			key: 'Enter',
			preventDefault: mockPreventDefault
		})

		expect(mockPreventDefault).toHaveBeenCalled()
	})

	it('does not prevent default behavior when other keys are pressed within the input', () => {
		const input = wrapper.find(Controller).invoke('render')!(
			mockRenderArgs,
			mockInputState
		)
		const mockPreventDefault = jest.fn()

		input.props.onKeyDown({
			key: 'Escape',
			preventDefault: mockPreventDefault
		})

		expect(mockPreventDefault).not.toHaveBeenCalled()
	})

	it('clears errors on focus if there are any', () => {
		wrapper = getMountedFormInput()

		const input = wrapper.find(Controller).invoke('render')!(
			mockRenderArgs,
			mockInputState
		)
		input.props.onFocus()

		expect(mockClearErrors).toHaveBeenCalled()
	})

	it('does not call clearErrors if there are no errors associated with the input', () => {
		wrapper = getMountedFormInput({ name: 'bar' })

		const input = wrapper.find(Controller).invoke('render')!(
			mockRenderArgs,
			{} as InputState
		)
		input.props.onFocus()

		expect(mockClearErrors).not.toHaveBeenCalled()
	})
})
