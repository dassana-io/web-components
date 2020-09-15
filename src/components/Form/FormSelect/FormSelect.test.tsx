import { Controller } from 'react-hook-form'
import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { iconOptions } from '../../Select/fixtures/sample_options'
import React from 'react'
import Select from '../../Select'
import FormSelect, { FormSelectProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	Controller: () => <div />,
	useFormContext: () => ({
		control: jest.fn(),
		errors: () => ({ foo: true })
	})
}))

let wrapper: ReactWrapper<FormSelectProps>

const mockOnSubmit = jest.fn()

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{
				initialValues: { foo: 'bar' },
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

	it('correctly passes a default value from initial values if it exists', () => {
		expect(wrapper.find(Controller).props().defaultValue).toEqual('bar')
	})

	it('should render a Select component', () => {
		const test = {
			onChange: jest.fn(),
			value: 'abc'
		} as jest.Mocked<any>

		const select = wrapper.find(Controller).invoke('render')!(test)

		expect(select.type).toBe(Select)
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
				<FormSelect
					label='Field Label'
					name='foo'
					options={iconOptions}
				/>
			</FieldContext.Provider>
		)

		expect(wrapper.find(FieldLabel)).toHaveLength(1)
	})
})
