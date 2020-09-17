import { basicOptions } from '../../RadioGroup/fixtures/sample_options'
import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import RadioGroup from '../../RadioGroup'
import React from 'react'
import FormRadioGroup, { FormRadioGroupProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({ foo: true })
	})
}))

let wrapper: ReactWrapper<FormRadioGroupProps>

const mockChangeEvent = {
	onChange: jest.fn(),
	value: 'abc'
} as jest.Mocked<any>
const mockOnSubmit = jest.fn()

const getRenderedCmp = (wrapper: ReactWrapper<FormRadioGroupProps>) =>
	wrapper.find(Controller).invoke('render')!(mockChangeEvent)

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				initialValues: { foo: 'bar' },
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

	it('correctly passes a default value from initial values if it exists', () => {
		expect(wrapper.find(Controller).props().defaultValue).toEqual('bar')
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
					initialValues: {},
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
