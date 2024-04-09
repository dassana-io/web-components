import { act, renderHook } from '@testing-library/react'
import { NotificationTypes, useNotifications } from '../utils'

describe('useNotifications', () => {
	it('should return a notification array', () => {
		const { result } = renderHook(() => useNotifications())

		act(() => {
			result.current.generateNotification({
				message: 'foo',
				type: NotificationTypes.info
			})
		})

		expect(result.current.notifications).toHaveLength(1)

		act(() => {
			result.current.notifications[0].onClose()
		})

		expect(result.current.notifications).toHaveLength(0)
	})
})
