import { PageLoader } from './index'
import React from 'react'
import { mount, type ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(<PageLoader />)
})

it('renders', () => {
	expect(wrapper.find(PageLoader)).toHaveLength(1)
})
