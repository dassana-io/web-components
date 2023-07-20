import React from 'react'
import { shallow, type ShallowWrapper } from 'enzyme'
import { Tag, type TagProps } from '.'

let wrapper: ShallowWrapper<TagProps>

describe('Tag', () => {
	it('renders', () => {
		wrapper = shallow(<Tag>Tag</Tag>)
		expect(wrapper).toHaveLength(1)
	})
})
