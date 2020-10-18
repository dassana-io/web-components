import { act, renderHook } from '@testing-library/react-hooks'
import {
	NOTIFICATION_CONTAINER_ID,
	NotificationTypes,
	useCreateDomElement,
	useNotifications
} from '../utils'

jest.spyOn(document.body, 'appendChild')
jest.spyOn(document.body, 'removeChild')

afterEach(() => {
	jest.clearAllMocks()
})

describe('useCreateDomElement', () => {
	afterEach(() => {
		// Jest only clears the DOM after ALL tests in the file are run, so the reset must be done manually since the DOM
		// is being manipulated in the following tests
		document.body.innerHTML = ''
	})

	it('should append a div to the document body', () => {
		const { unmount } = renderHook(() => useCreateDomElement())

		expect(document.body.appendChild).toHaveBeenCalled()

		unmount()

		expect(document.body.removeChild).toHaveBeenCalled()
	})

	it('should append the notification to correct popup container if one is provided', () => {
		const popupContainerElement = document.createElement('div')
		const popupContainerId = 'popup-container'
		popupContainerElement.setAttribute('id', popupContainerId)
		document.body.appendChild(popupContainerElement)

		renderHook(() =>
			useCreateDomElement(
				() =>
					document.querySelector(
						`#${popupContainerId}`
					) as HTMLElement
			)
		)

		expect(
			document.querySelector('#popup-container')?.firstElementChild?.id
		).toBe(NOTIFICATION_CONTAINER_ID)
	})

	it('should default the root to document.body if getPopupContainer returns null', () => {
		const { unmount } = renderHook(() =>
			useCreateDomElement(
				() =>
					document.querySelector(
						'#non-existent-selector'
					) as HTMLElement
			)
		)

		expect(document.body.firstElementChild?.id).toBe(
			NOTIFICATION_CONTAINER_ID
		)

		unmount()
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
