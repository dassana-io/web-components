import React from 'react'
import { IngestionStatusDot, Status } from '.'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

describe('IngestionStatusDot', () => {
	beforeEach(() => {
		wrapper = mount(<IngestionStatusDot status={Status.OK} />)
	})

	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})
})
