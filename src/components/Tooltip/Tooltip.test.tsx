import { Tooltip as AntDTooltip } from 'antd'
import React from 'react'
import { mount, shallow, type ShallowWrapper } from 'enzyme'
import { Tooltip, type TooltipProps } from './index'

let wrapper: ShallowWrapper

const mockTitle = 'foo'

const getWrapper = (
	additionalProps?: Omit<TooltipProps, 'children' | 'title'>
): ShallowWrapper =>
	shallow(
		<Tooltip title={mockTitle} {...additionalProps}>
			<div>Hello World</div>
		</Tooltip>
	)

beforeEach(() => {
	wrapper = getWrapper()
})

describe('Tooltip', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('correctly passes the title prop', () => {
		expect(wrapper.find(AntDTooltip).props().title).toEqual(mockTitle)
	})

	it('correctly passes the placement prop if one is provided', () => {
		wrapper = getWrapper({ placement: 'top' })
		expect(wrapper.find(AntDTooltip).props().placement).toEqual('top')
	})

	it('does not pass the popupContainerSelector prop if it does not exist', () => {
		const wrapper = mount(
			<Tooltip title={mockTitle}>
				<div>Hello World</div>
			</Tooltip>
		)

		expect(
			wrapper.find(Tooltip).props().popupContainerSelector
		).toBeUndefined()

		expect(wrapper.find(AntDTooltip).props().getPopupContainer).toBeFalsy()
	})

	it('correctly passes the popupContainerSelector prop if it exists', () => {
		const wrapper = mount(
			<Tooltip popupContainerSelector='.test-container' title={mockTitle}>
				<div>Hello World</div>
			</Tooltip>
		)

		expect(wrapper.find(Tooltip).props().popupContainerSelector).toEqual(
			'.test-container'
		)

		expect(wrapper.find(AntDTooltip).props().getPopupContainer).toBeTruthy()
	})

	it('has a default placement of right', () => {
		expect(wrapper.find(AntDTooltip).props().placement).toBe('right')
	})
})
