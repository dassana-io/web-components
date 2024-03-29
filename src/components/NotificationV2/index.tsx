import { AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import { useCreateDomElement } from 'components/utils'
import { Notification, type NotificationConfigProps } from './Notification'
import {
	NOTIFICATION_CONTAINER_ID,
	type NotificationConfig as NotificationConfigInterface,
	NotificationTypes,
	type ProcessedNotification,
	useNotifications
} from './utils'
import { NotificationCtxProvider, useNotification } from './NotificationContext'
import React, { type FC, type ReactNode } from 'react'

const { spacing, topNavHeight } = styleguide

const useStyles = createUseStyles({
	container: {
		position: 'fixed',
		right: spacing.m,
		top: topNavHeight,
		zIndex: 100001
	}
})

export type NotificationConfig = NotificationConfigInterface

export interface NotificationProviderProps extends NotificationConfigProps {
	children: ReactNode
	getPopupContainer?: () => HTMLElement
}

const NotificationProvider: FC<NotificationProviderProps> = ({
	children,
	getPopupContainer,
	...rest
}: NotificationProviderProps) => {
	const rootElement = useCreateDomElement(
		NOTIFICATION_CONTAINER_ID,
		getPopupContainer
	)

	const { generateNotification, notifications } = useNotifications()

	const classes = useStyles()

	return (
		<>
			<NotificationCtxProvider value={{ generateNotification }}>
				{children}
			</NotificationCtxProvider>
			{rootElement &&
				createPortal(
					<div className={classes.container}>
						<AnimatePresence>
							{notifications.map(
								(notification: ProcessedNotification) => (
									<Notification
										key={notification.id}
										{...notification}
										{...rest}
									/>
								)
							)}
						</AnimatePresence>
					</div>,
					rootElement
				)}
		</>
	)
}

export { NotificationProvider, NotificationTypes, useNotification }
