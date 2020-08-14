import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
<<<<<<< HEAD
import Tag, { TagProps } from '.'
=======
import Tag, { TagProps } from './index'
>>>>>>> Feat #43 - Tag, Link components

let wrapper: ShallowWrapper<TagProps>

describe('Tag', () => {
	it('renders', () => {
		wrapper = shallow(<Tag>Tag</Tag>)
		expect(wrapper).toHaveLength(1)
	})
})
