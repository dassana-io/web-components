import { Button as AntDButton } from 'antd'
import React from 'react'
import { Skeleton } from '../Skeleton'
import { Spin } from 'components/Spin'
import { Button, ButtonProps } from '.'
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

describe('Loading Button', () => {
	beforeEach(() => {
		wrapper = shallow(
			<Button loading onClick={mockClick}>
				Test
			</Button>
		)
	})
	it('renders a skeleton', () => {
		expect(wrapper.find(Skeleton)).toHaveLength(1)
	})

	it('renders a skeleton with a default width of 75 and height of 32', () => {
		expect(wrapper.find(Skeleton).props().height).toBe(32)
		expect(wrapper.find(Skeleton).props().width).toBe(75)
	})

	it('renders a skeleton with the correct custom dimensions', () => {
		wrapper = shallow(
			<Button
				loading
				onClick={mockClick}
				skeletonHeight={50}
				skeletonWidth={200}
			>
				Test
			</Button>
		)

		expect(wrapper.find(Skeleton).props().height).toBe(50)
		expect(wrapper.find(Skeleton).props().width).toBe(200)
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

describe('Pending Button', () => {
	beforeEach(() => {
		wrapper = shallow(
			<Button onClick={mockClick} pending>
				Test
			</Button>
		)
	})

	it('renders a Spin component', () => {
		expect(wrapper.find(Spin)).toHaveLength(1)
	})

	it('automatically disables the button', () => {
		expect(wrapper.find(AntDButton).props().disabled).toBeTruthy()
	})
})
