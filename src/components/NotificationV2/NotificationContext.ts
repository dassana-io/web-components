import { createCtx } from '@dassana-io/web-utils'
import { NotificationConfig } from './utils'

export interface NotificationContextProps {
	generateNotification: (notification: NotificationConfig) => void
}

const [useNotificationContext, NotificationCtxProvider] = createCtx<
	NotificationContextProps
>()

export { NotificationCtxProvider, useNotificationContext as useNotification }
