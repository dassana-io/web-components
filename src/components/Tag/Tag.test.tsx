import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Tag, { TagProps } from './index'

let wrapper: ShallowWrapper<TagProps>

describe('Tag', () => {
	it('renders', () => {
		wrapper = shallow(<Tag>Tag</Tag>)
		expect(wrapper).toHaveLength(1)
	})
})
