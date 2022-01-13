import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { iconOptions } from 'components/Select/fixtures/sample_options'
import React from 'react'
import { Select } from 'components/Select/SingleSelect'
import FormSelect, { FormSelectProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...(jest.requireActual('react-hook-form') as {}),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		formState: {
			errors: { foo: true }
		}
	})
}))

let wrapper: ReactWrapper<FormSelectProps>

const mockOnChange = jest.fn()
const mockChangeEvent = {
	field: {
		onChange: mockOnChange,
		value: true
	}
} as jest.Mocked<any>
const mockOnSubmit = jest.fn()

const getRenderedCmp = (wrapper: ReactWrapper<FormSelectProps>) =>
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
			<FormSelect name='foo' options={iconOptions} />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormSelect', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('should render a Select component', () => {
		const select = getRenderedCmp(wrapper)

		expect(select.type).toBe(Select)
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
				<FormSelect
					label='Field Label'
					name='foo'
					options={iconOptions}
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
				<FormSelect
					label='Field Label'
					name='foo'
					options={iconOptions}
				/>{' '}
			</FieldContext.Provider>
		)

		const select = getRenderedCmp(wrapper)

		expect(select.props.disabled).toBe(true)
	})
})
