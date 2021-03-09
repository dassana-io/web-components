import { basicOptions } from 'components/RadioGroup/fixtures/sample_options'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { RadioGroup } from 'components/RadioGroup'
import React from 'react'
import { Controller, InputState } from 'react-hook-form'
import FormRadioGroup, { FormRadioGroupProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({})
	})
}))

let wrapper: ReactWrapper<FormRadioGroupProps>

const mockChangeEvent = {
	onChange: jest.fn(),
	value: 'abc'
} as jest.Mocked<any>
const mockOnSubmit = jest.fn()

const getRenderedCmp = (wrapper: ReactWrapper<FormRadioGroupProps>) =>
	wrapper.find(Controller).invoke('render')!(
		mockChangeEvent,
		{} as InputState
	)

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				loading: true,
				onSubmit: mockOnSubmit
			}}
		>
			<FormRadioGroup name='foo' options={basicOptions} />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormRadioGroup', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('should render a Radio Group component', () => {
		const radioGroup = getRenderedCmp(wrapper)

		expect(radioGroup.type).toBe(RadioGroup)
	})

	it('should call onChange with the target value extracted from the event', () => {
		const radioGroup = getRenderedCmp(wrapper)

		radioGroup.props.onChange({ target: { value: 'foo' } })

		expect(mockChangeEvent.onChange).toHaveBeenCalledWith('foo')
	})

	it('renders a label if one is passed in', () => {
		wrapper = mount(
			<FieldContext.Provider
				value={{
					loading: true,
					onSubmit: mockOnSubmit
				}}
			>
				<FormRadioGroup
					label='Field Label'
					name='foo'
					options={basicOptions}
				/>
			</FieldContext.Provider>
		)
		expect(wrapper.find(FieldLabel)).toHaveLength(1)
	})
})
