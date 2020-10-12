import { Popover as AntDPopover } from 'antd'
import React from 'react'
import { Popover, PopoverProps } from './index'
import { shallow, ShallowWrapper } from 'enzyme'

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

	it('has a default placement of bottom', () => {
		expect(wrapper.find(AntDPopover).props().placement).toBe('bottom')
	})
})
