import { generateNotification } from './index'
import { notification } from 'antd'

jest.mock('antd', () => ({
	...jest.requireActual('antd'),
	notification: {
		error: jest.fn(),
		info: jest.fn(),
		success: jest.fn(),
		warning: jest.fn()
	}
}))

describe('Notification', () => {
	it('should use the notification api provided by AntD', () => {
		const mockErrorNotification = 'Fake Error Notification'
		generateNotification('error', mockErrorNotification)

		expect(notification.error).toHaveBeenCalledWith({
			message: mockErrorNotification
		})
	})
})
