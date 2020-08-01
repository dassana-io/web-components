import React from 'react'
import Button from './index'
import { shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper
let mockClick: jest.Mock<any, any>

beforeEach(() => {
	mockClick = jest.fn()
})

describe('Button', () => {
	it('renders', () => {
		wrapper = shallow(<Button onClick={mockClick} />)
		expect(wrapper).toHaveLength(1)
	})

	it('runs onClick function when button is clicked', () => {
		wrapper = shallow(<Button onClick={mockClick} />)
		expect(wrapper.simulate('click'))
		expect(mockClick).toHaveBeenCalledTimes(1)
	})
})

describe('Disabled Button', () => {
	it('has correct prop "disabled" and correct class "disabled"', () => {
		wrapper = shallow(<Button disabled onClick={mockClick} />)
		expect(wrapper.props().disabled).toEqual(true)
		expect(wrapper.find('button').hasClass('disabled')).toBeTruthy()
	})
})

describe('Submit Button', () => {
	it('has correct type "submit"', () => {
		wrapper = shallow(<Button type='submit' onClick={mockClick} />)
		expect(wrapper.props().type).toEqual('submit')
	})
})
