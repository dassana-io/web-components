import * as hooks from '../utils'
import { Button } from 'components/Button'
import { mount } from 'enzyme'
import { Notification } from '../Notification'
import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import {
	NotificationProvider,
	NotificationProviderProps,
	useNotification
} from '../index'

const generateNotificationSpy = jest.fn()
const mockMessage = 'foo'

// @ts-ignore
jest.spyOn(hooks, 'useNotifications').mockImplementation(() => ({
	generateNotification: generateNotificationSpy,
	notifications: [
		{
			id: 'foo',
			message: mockMessage,
			type: hooks.NotificationTypes.info
		}
	]
}))

jest.mock('react-dom', () => {
	const original = jest.requireActual('react-dom')
	return {
		...original,
		createPortal: (node: any) => node
	}
})
jest.mock('framer-motion', () => {
	const AnimatePresence = jest.fn(({ children }) => children)
	const LazyMotion = jest.fn(({ children }) => children)
	const m = {
		div: jest.fn(({ children }) => children)
	}

	return {
		AnimatePresence,
		LazyMotion,
		m
	}
})

let wrapper: React.FC<NotificationProviderProps>

afterEach(() => {
	jest.clearAllMocks()
})

it('should provide a generateNotification function via context', () => {
	wrapper = ({ children }: NotificationProviderProps) => (
		<NotificationProvider>{children}</NotificationProvider>
	)

	const { result } = renderHook(() => useNotification(), { wrapper })

	act(() => {
		result.current.generateNotification({
			message: 'foo',
			type: hooks.NotificationTypes.info
		})
	})

	expect(generateNotificationSpy).toHaveBeenCalled()
})

it('should render a Notification for every notification config in the notifications array', () => {
	const component = mount(
		<NotificationProvider>
			<Button onClick={jest.fn()}>Test</Button>
		</NotificationProvider>
	)

	const notification = component.find(Notification)

	expect(notification).toHaveLength(1)
	expect(notification.props().message).toEqual(mockMessage)
})
