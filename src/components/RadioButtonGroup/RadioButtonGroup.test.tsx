import { Radio as AntDRadio } from 'antd'
import { basicOptions } from './fixtures/sample_options'
import { RadioButtonGroup } from './index'
import React from 'react'
import { Skeleton } from '../Skeleton'
import { mount, type ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(<RadioButtonGroup options={basicOptions} />)
})

describe('RadioButtonGroup', () => {
	it('renders', () => {
		expect(wrapper.find(RadioButtonGroup)).toHaveLength(1)
	})

	it('should pass onChange and value to the input component if the props exist', () => {
		const mockOnChange = jest.fn()
		wrapper = mount(
			<RadioButtonGroup
				onChange={mockOnChange}
				options={basicOptions}
				value='low'
			/>
		)

		expect(wrapper.find(AntDRadio.Group).props().onChange).toEqual(
			mockOnChange
		)
		expect(wrapper.find(AntDRadio.Group).props().value).toEqual('low')
	})

	it('should have a default value of the first option if none is passed in', () => {
		expect(wrapper.find(AntDRadio.Group).props().defaultValue).toEqual(
			basicOptions[0].value
		)
	})

	it('correctly passes the disabled prop', () => {
		wrapper = mount(<RadioButtonGroup disabled options={basicOptions} />)

		expect(wrapper.find(AntDRadio.Group).props().disabled).toBeTruthy()
	})

	it('correctly passes the options prop', () => {
		expect(wrapper.find(AntDRadio.Group).props().options).toMatchObject(
			basicOptions
		)
	})

	describe('loading', () => {
		it('renders a loading skeleton', () => {
			wrapper = mount(<RadioButtonGroup loading options={basicOptions} />)

			expect(wrapper.find(Skeleton)).toHaveLength(basicOptions.length)
		})
	})
})
