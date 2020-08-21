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
