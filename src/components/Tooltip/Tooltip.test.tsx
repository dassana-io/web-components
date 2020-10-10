import { Tooltip as AntDTooltip } from 'antd'
import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Tooltip, TooltipProps } from './index'

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

	it('has a default placement of right', () => {
		expect(wrapper.find(AntDTooltip).props().placement).toBe('right')
	})
})
