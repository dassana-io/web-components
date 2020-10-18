import omit from 'lodash/omit'
import { styleguide } from 'components/assets/styles'
import { v4 as uuidV4 } from 'uuid'
import { themedStyles, themes, ThemeType } from '../assets/styles/themes'
import { useCallback, useEffect, useState } from 'react'

const { spacing } = styleguide

export const NOTIFICATION_CONTAINER_ID = 'notification-root'

export const useCreateDomElement = (
	getPopupContainer: () => HTMLElement = () => document.body
) => {
	const [domElement, setDomElement] = useState<HTMLDivElement | null>(null)

	const root = getPopupContainer() || document.body

	useEffect(() => {
		const element = document.createElement('div')
		element.setAttribute('id', NOTIFICATION_CONTAINER_ID)

		root.appendChild(element)
		setDomElement(element)

		return () => {
			root.removeChild(element)
		}
	}, [root])

	return domElement
}

export enum NotificationTypes {
	error = 'error',
	info = 'info',
	success = 'success',
	warning = 'warning'
}

export interface NotificationConfig {
	duration?: number
	message: string
	type: NotificationTypes
}

export interface ProcessedNotification
	extends Omit<NotificationConfig, 'duration'> {
	id: string
	onClose: () => void
}

export const useNotifications = () => {
	const [notifications, setNotifications] = useState<ProcessedNotification[]>(
		[]
	)

	const generateNotification = useCallback(
		(notificationConfig: NotificationConfig) => {
			const { duration = 2000 } = notificationConfig
			const processedConfig = omit(notificationConfig, 'duration')
			const id = uuidV4()

			const removeNotification = () => {
				setNotifications((notifications: ProcessedNotification[]) =>
					notifications.filter(notification => notification.id !== id)
				)
			}

			setNotifications((notifications: ProcessedNotification[]) => [
				...notifications,
				{
					...processedConfig,
					id,
					onClose: removeNotification
				}
			])

			// setTimeout(removeNotification, duration)
		},
		[]
	)

	return { generateNotification, notifications }
}

export const generateNotificationStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]
	const palette = themes[themeType]

	return {
		background: palette.background.primary,
		border: `1px solid ${base.borderColor}`,
		borderRadius: 4,
		color: base.color,
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: spacing.m,
		padding: spacing.m,
		position: 'relative',
		width: 384
	}
}
