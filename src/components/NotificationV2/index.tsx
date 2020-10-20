import { AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { createUseStyles } from 'react-jss'
import { Notification } from './Notification'
import { styleguide } from 'components/assets/styles'
import {
	NotificationConfig as NotificationConfigInterface,
	NotificationTypes,
	ProcessedNotification,
	useCreateDomElement,
	useNotifications
} from './utils'
import { NotificationCtx, useNotification } from './NotificationContext'
import React, { FC, ReactNode } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		position: 'fixed',
		right: spacing.m,
		top: 64
	}
})

export type NotificationConfig = NotificationConfigInterface

export interface NotificationProviderProps {
	children: ReactNode
	getPopupContainer?: () => HTMLElement
}

const NotificationProvider: FC<NotificationProviderProps> = ({
	children,
	getPopupContainer
}: NotificationProviderProps) => {
	const rootElement = useCreateDomElement(getPopupContainer)

	const { generateNotification, notifications } = useNotifications()

	const classes = useStyles()

	return (
		<>
			<NotificationCtx.Provider value={{ generateNotification }}>
				{children}
			</NotificationCtx.Provider>
			{rootElement &&
				createPortal(
					<div className={classes.container}>
						<AnimatePresence>
							{notifications.map(
								(notification: ProcessedNotification) => (
									<Notification
										key={notification.id}
										{...notification}
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
