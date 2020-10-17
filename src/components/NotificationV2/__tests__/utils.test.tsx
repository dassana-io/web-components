import { act, renderHook } from '@testing-library/react-hooks'
import {
	NotificationTypes,
	useCreateDomElement,
	useNotifications
} from '../utils'

jest.spyOn(document.body, 'appendChild')
jest.spyOn(document.body, 'removeChild')

describe('useCreateDomElement', () => {
	it('should append a div to the document body', () => {
		const { unmount } = renderHook(() => useCreateDomElement())

		expect(document.body.appendChild).toHaveBeenCalled

		unmount()

		expect(document.body.removeChild).toHaveBeenCalled
	})
})

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
