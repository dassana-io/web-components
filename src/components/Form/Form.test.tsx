import FieldContext from './FieldContext'
import FormButton from './FormButton'
import React from 'react'
import Form, { FormProps } from './index'
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	useForm: () => ({
		handleSubmit: jest.fn(),
		reset: mockReset
	})
}))

let wrapper: ReactWrapper<FormProps> | ShallowWrapper<FormProps>

const mockOnSubmit = jest.fn()
const mockReset = jest.fn()

beforeEach(() => {
	wrapper = shallow(
		<Form onSubmit={mockOnSubmit}>
			<FormButton />
		</Form>
	)
})

describe('Form', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('renders children properly', () => {
		expect(wrapper.find(FormButton)).toHaveLength(1)
	})

	it('passes the correct props to FieldContext provider', () => {
		expect(wrapper.find(FieldContext.Provider).props().value).toMatchObject(
			{
				loading: false,
				onSubmit: mockOnSubmit
			}
		)
	})

	it('sets initial values into the form', () => {
		const mockInitialValues = { foo: 'bar' }
		wrapper = mount(
			<Form initialValues={mockInitialValues} onSubmit={mockOnSubmit}>
				<FormButton />
			</Form>
		)

		expect(mockReset).toHaveBeenCalledTimes(1)
		expect(mockReset).toHaveBeenCalledWith(mockInitialValues)
	})
})
