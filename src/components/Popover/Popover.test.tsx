import { Popover as AntDPopover } from 'antd'
import React from 'react'
import { mount, shallow, ShallowWrapper } from 'enzyme'
import { Popover, PopoverProps } from './index'

let wrapper: ShallowWrapper

const mockContent = <div>DASSANA</div>
const mockTitle = 'foo'

const getWrapper = (
	additionalProps?: Omit<PopoverProps, 'children' | 'content'>
): ShallowWrapper =>
	shallow(
		<Popover content={mockContent} {...additionalProps}>
			<div>Hello World</div>
		</Popover>
	)

beforeEach(() => {
	wrapper = getWrapper()
})

describe('Popover', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('correctly passes the content prop', () => {
		expect(wrapper.find(AntDPopover).props().content).toEqual(mockContent)
	})

	it('correctly passes the title prop if one is provided', () => {
		wrapper = getWrapper({ title: mockTitle })
		expect(wrapper.find(AntDPopover).props().title).toEqual(mockTitle)
	})

	it('correctly passes the placement prop if one is provided', () => {
		wrapper = getWrapper({ placement: 'top' })
		expect(wrapper.find(AntDPopover).props().placement).toEqual('top')
	})

	it('does not pass the popupContainerSelector prop if it does not exist', () => {
		const wrapper = mount(
			<Popover content={mockContent}>
				<div>Hello World</div>
			</Popover>
		)

		expect(
			wrapper.find(Popover).props().popupContainerSelector
		).toBeUndefined()

		expect(wrapper.find(AntDPopover).props().getPopupContainer).toBeFalsy()
	})

	it('correctly passes the popupContainerSelector prop if it exists', () => {
		const wrapper = mount(
			<Popover
				content={mockContent}
				popupContainerSelector='.test-container'
			>
				<div>Hello World</div>
			</Popover>
		)

		expect(wrapper.find(Popover).props().popupContainerSelector).toEqual(
			'.test-container'
		)

		expect(wrapper.find(AntDPopover).props().getPopupContainer).toBeTruthy()
	})

	it('has a default placement of bottom', () => {
		expect(wrapper.find(AntDPopover).props().placement).toBe('bottom')
	})
})
