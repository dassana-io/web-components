import React from 'react'
import { ThemeType } from 'components/assets/styles'
import { Tooltip } from 'antd'
import { ColoredDot, ColoredDotProps } from '.'
import { mount, ReactWrapper } from 'enzyme'

const { light, dark } = ThemeType

const MOCK_COLORS = { [dark]: 'red', [light]: 'red' }
const MOCK_TOOLTIP_TEXT = 'Hi I am color'

let wrapper: ReactWrapper

const mountWrapper = (props: ColoredDotProps) =>
	(wrapper = mount(
		<div>
			<ColoredDot {...props} />
		</div>
	))

describe('ColoredDot', () => {
	beforeEach(() => {
		mountWrapper({})
	})

	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('renders without a tooltip if both tooltip text and colors are not provided', () => {
		expect(wrapper.find(Tooltip)).toHaveLength(0)
	})

	it('renders with a tooltip if both tooltip text and colors provided', () => {
		mountWrapper({
			colors: MOCK_COLORS,
			tooltipText: MOCK_TOOLTIP_TEXT
		})

		expect(wrapper.find(Tooltip)).toHaveLength(1)
	})

	it('renders a dot with background color transparent if no colors are provided', () => {
		const dot = wrapper.find(ColoredDot)

		const style = window.getComputedStyle(dot.getDOMNode())

		expect(style.background).toBe('transparent')
	})

	it('renders a dot with correct background color if colors are provided', () => {
		mountWrapper({
			colors: MOCK_COLORS
		})

		const dot = wrapper.find(ColoredDot)

		const style = window.getComputedStyle(dot.getDOMNode())

		expect(style.background).toBe('red')
	})
})
