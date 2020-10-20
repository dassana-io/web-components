import { NotificationConfig } from './utils'
import { createContext, useContext } from 'react'

export interface NotificationContextProps {
	generateNotification: (notification: NotificationConfig) => void
}

const NotificationCtx = createContext<NotificationContextProps>(
	{} as NotificationContextProps
)

const useNotification = (): NotificationContextProps =>
	useContext(NotificationCtx)

export { NotificationCtx, useNotification }
