import React from 'react'
import Button from './index'
import { shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper
let mockClick: jest.Mock<any, any>

beforeEach(() => {
	mockClick = jest.fn()
	wrapper = shallow(<Button onClick={mockClick} />)
})

describe('<Button />', () => {
	it('renders', () => {
		expect(wrapper.find('button')).toHaveLength(1)
	})

	it('runs onClick function when button is clicked', () => {
		expect(wrapper.find('button').simulate('click'))
		expect(mockClick).toHaveBeenCalled()
		expect(mockClick).toHaveBeenCalledTimes(1)
	})
})
