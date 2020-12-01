import React from 'react'
import FieldError, { FieldErrorProps } from './index'
import { mount, shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper<FieldErrorProps>

const MOCK_ERROR = 'Error Text'

const baseMockProps = {
	error: MOCK_ERROR
}

beforeEach(() => {
	wrapper = shallow(<FieldError {...baseMockProps} />)
})

describe('Field Error', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('correctly renders the error', () => {
		expect(wrapper.text()).toContain(MOCK_ERROR)
	})

	it('renders a field error that will span the width of its parent container if fullWidth is to true', () => {
		const fieldError = mount(<FieldError fullWidth {...baseMockProps} />)

		const style = window.getComputedStyle(fieldError.getDOMNode())

		expect(style.width).toEqual('100%')
	})
})
