import { Button as AntDButton } from 'antd'
import React from 'react'
import Button, { ButtonProps } from '.'
import { shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper<ButtonProps>
let mockClick: jest.Mock<void>

beforeEach(() => {
	mockClick = jest.fn()
	wrapper = shallow(<Button onClick={mockClick}>Test</Button>)
})

describe('Button', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('runs onClick function when button is clicked', () => {
		expect(wrapper.simulate('click'))
		expect(mockClick).toHaveBeenCalledTimes(1)
	})

	it('should pass type primary if primary is passed as true', () => {
		wrapper = shallow(
			<Button onClick={mockClick} primary>
				Test
			</Button>
		)
		expect(wrapper.find(AntDButton).props().type).toEqual('primary')
	})

	it('should have a type default by default', () => {
		expect(wrapper.find(AntDButton).props().type).toEqual('default')
	})
})

describe('Disabled Button', () => {
	it('has correct prop "disabled" and correct class "disabled"', () => {
		wrapper = shallow(
			<Button disabled onClick={mockClick}>
				Test
			</Button>
		)
		expect(wrapper.props().disabled).toBeTruthy()
	})
})
