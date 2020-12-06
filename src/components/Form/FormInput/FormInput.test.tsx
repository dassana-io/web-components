import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { Input } from 'components/Input'
import React from 'react'
import FormInput, { FormInputProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

const mockFocus = jest.fn()
const mockClearErrors = jest.fn()

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
		const input = wrapper.find(Controller).invoke('render')!(mockRenderArgs)

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

	it('focuses on the input if required', () => {
		wrapper = getMountedFormInput({ focused: true })

		expect(mockFocus).toHaveBeenCalled()
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
