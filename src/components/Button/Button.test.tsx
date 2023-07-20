import { Button } from '.'
import React from 'react'
import { render, screen } from '@testing-library/react'

let mockClick: jest.Mock<void>

beforeEach(() => {
	mockClick = jest.fn()
})

describe('Button', () => {
	beforeEach(() => {
		render(<Button onClick={mockClick}>Test</Button>)
	})

	it('renders', () => {
		expect(screen.getByText('Test')).toBeTruthy()
	})

	it('runs onClick function when button is clicked', () => {
		const button = screen.getByRole('button')

		button.click()

		expect(mockClick).toHaveBeenCalledTimes(1)
	})

	// it('should pass type primary if primary is passed as true', () => {
	// 	wrapper = shallow(
	// 		<Button onClick={mockClick} primary>
	// 			Test
	// 		</Button>
	// 	)
	// 	render(<Button onClick={mockClick}>Test</Button>)

	// 	expect(wrapper.find(AntDButton).props().type).toEqual('primary')
	// })

	// it('should have a type default by default', () => {
	// 	expect(wrapper.find(AntDButton).props().type).toEqual('default')
	// })
})

describe('Loading Button', () => {
	beforeEach(() => {
		render(
			<Button loading onClick={mockClick}>
				Test
			</Button>
		)
	})

	it('does not render a button', () => {
		expect(screen.getByRole('button')).toBeFalsy()
	})
})

describe('Disabled Button', () => {
	it('has correct prop "disabled" and correct class "disabled"', () => {
		render(
			<Button disabled onClick={mockClick}>
				Test
			</Button>
		)

		const button = screen.getByRole('button')

		button.click()

		expect(mockClick).toHaveBeenCalledTimes(0)
	})
})

describe('Pending Button', () => {
	beforeEach(() => {
		render(
			<Button onClick={mockClick} pending>
				Test
			</Button>
		)
	})

	it('renders a Spin component', () => {
		expect(screen.getByRole('img')).toHaveClass('anticon-spin')
	})

	it('automatically disables the button', () => {
		const button = screen.getByRole('button')

		button.click()

		expect(mockClick).toHaveBeenCalledTimes(0)
	})
})
