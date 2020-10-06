import 'antd/lib/notification/style/index.css'
import { notification } from 'antd'
import { ConfigProps, IconType } from 'antd/lib/notification'

export const generateNotification = (
	type: IconType,
	message: string,
	config?: ConfigProps
): void =>
	notification[type]({
		message,
		...config
	})
