import { basicOptions } from 'components/RadioButtonGroup/fixtures/sample_options'
import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { RadioButtonGroup } from 'components/RadioButtonGroup'
import React from 'react'
import FormRadioButtonGroup, { type FormRadioButtonGroupProps } from './index'
import { mount, type ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form')),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({})
	})
}))

let wrapper: ReactWrapper<FormRadioButtonGroupProps>

const mockChangeEvent = {
	field: {
		onChange: jest.fn(),
		value: 'abc'
	}
} as jest.Mocked<any>
const mockOnSubmit = jest.fn()

const getRenderedCmp = (wrapper: ReactWrapper<FormRadioButtonGroupProps>) =>
	wrapper.find(Controller).invoke('render')!(mockChangeEvent)

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				disabled: false,
				loading: true,
				onSubmit: mockOnSubmit
			}}
		>
			<FormRadioButtonGroup name='foo' options={basicOptions} />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormRadioButtonGroup', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('should render a Radio Group component', () => {
		const radioGroup = getRenderedCmp(wrapper)

		expect(radioGroup.type).toBe(RadioButtonGroup)
	})

	it('should call onChange with the target value extracted from the event', () => {
		const radioGroup = getRenderedCmp(wrapper)

		radioGroup.props.onChange({ target: { value: 'foo' } })

		expect(mockChangeEvent.field.onChange).toHaveBeenCalledWith('foo')
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
				<FormRadioButtonGroup
					label='Field Label'
					name='foo'
					options={basicOptions}
				/>
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
				<FormRadioButtonGroup
					label='Field Label'
					name='foo'
					options={basicOptions}
				/>
			</FieldContext.Provider>
		)

		const radioGroup = getRenderedCmp(wrapper)

		expect(radioGroup.props.disabled).toBe(true)
	})
})
