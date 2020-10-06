import React from 'react'
import Avatar, { AvatarProps } from '.'
import { shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper<AvatarProps>

describe('Avatar', () => {
	it('renders', () => {
		wrapper = shallow(<Avatar>A</Avatar>)

		expect(wrapper).toHaveLength(1)
	})
})
