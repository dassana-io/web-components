import 'antd/lib/notification/style/index.css'
import { IconType } from 'antd/lib/notification'
import { notification } from 'antd'

export const generateNotification = (type: IconType, message: string): void =>
	notification[type]({
		message
	})
