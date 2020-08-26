import FieldContext from './FieldContext'
import FormButton from './FormButton'
import React from 'react'
import Form, { FormProps } from './index'
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	useForm: () => ({
		handleSubmit: jest.fn()
	})
}))

interface MockForm {
	foo: string
}

let wrapper:
	| ReactWrapper<FormProps<MockForm>>
	| ShallowWrapper<FormProps<MockForm>>

const mockInitialValues = { foo: 'bar' }
const mockOnSubmit = jest.fn()

beforeEach(() => {
	wrapper = shallow(
		<Form initialValues={mockInitialValues} onSubmit={mockOnSubmit}>
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
				initialValues: mockInitialValues,
				loading: false,
				onSubmit: mockOnSubmit
			}
		)
	})

	it('correctly defaults initial values if there are none', () => {
		wrapper = shallow(
			<Form onSubmit={mockOnSubmit}>
				<FormButton />
			</Form>
		)

		expect(
			wrapper.find(FieldContext.Provider).props().value
		).toMatchObject({ initialValues: {} })
	})
})
