import Button from '../../Button'
import FieldContext from '../FieldContext'
import React from 'react'
import FormButton, { FormButtonProps } from './index'
import { mount, ReactWrapper } from 'enzyme'

jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	useFormContext: () => ({
		handleSubmit: (onSubmit: Function) => onSubmit()
	})
}))

let wrapper: ReactWrapper<FormButtonProps>

const mockOnSubmit = jest.fn()

beforeEach(() => {
	wrapper = mount(
		<FieldContext.Provider
			value={{ loading: true, onSubmit: mockOnSubmit }}
		>
			<FormButton />
		</FieldContext.Provider>
	)
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('FormButton', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('calls onSubmit when clicked', () => {
		wrapper.simulate('click')

		expect(mockOnSubmit).toHaveBeenCalledTimes(1)
	})

	it('correctly passes loading from field context', () => {
		expect(wrapper.find(Button).props().rendering).toBe(true)
	})
})
