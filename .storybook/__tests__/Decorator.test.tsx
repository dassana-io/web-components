import React from 'react'
import Decorator, { DecoratorProps } from '../Decorator'
import { shallow, ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper<DecoratorProps>

describe('Decorator', () => {
	it('renders', () => {
		wrapper = shallow(<Decorator>Decorator</Decorator>)

		expect(wrapper).toHaveLength(1)
	})
})
