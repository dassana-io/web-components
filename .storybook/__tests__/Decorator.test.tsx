import React from 'react'
import Decorator, { DecoratorProps } from '../Decorator'
import { shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper<DecoratorProps>

describe('Avatar', () => {
	it('renders', () => {
		wrapper = shallow(<Decorator>A</Decorator>)

		expect(wrapper).toHaveLength(1)
	})
})
