import { generateNotification } from './index'
import { notification } from 'antd'

describe('Notification', () => {
	it('should render a notification with the message content', () => {
		generateNotification('error', 'something')

		const notification = document.querySelectorAll('.ant-notification')[0]

		expect(notification).toBeDefined()
		expect(notification.textContent).toBe('something')
	})

	it('should use the notification api provided by AntD', () => {
		jest.spyOn(notification, 'error')

		const mockErrorNotification = 'Fake Error Notification'
		generateNotification('error', mockErrorNotification)

		expect(notification.error).toHaveBeenCalledWith(
			expect.objectContaining({
				message: mockErrorNotification
			})
		)
	})
})
