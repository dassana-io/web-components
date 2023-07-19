import { Notification } from '../Notification'
import { NotificationTypes } from '../utils'
import React from 'react'
import { shallow, type ShallowWrapper } from 'enzyme'

let wrapper: ShallowWrapper

const mockMessage = 'foo'

const onCloseSpy = jest.fn()

beforeEach(() => {
	wrapper = shallow(
		<Notification
			id='123'
			message={mockMessage}
			onClose={onCloseSpy}
			type={NotificationTypes.info}
		/>
	)
})

describe('Notification', () => {
	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})
})
