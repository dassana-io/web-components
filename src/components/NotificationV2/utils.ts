import { ev as NotificationTypes } from '@dassana-io/web-utils'
import omit from 'lodash/omit'
import { styleguide } from 'components/assets/styles'
import { v4 as uuidV4 } from 'uuid'
import {
	faCheckCircle,
	faExclamationCircle,
	faExclamationTriangle,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { themedStyles, themes, ThemeType } from '../assets/styles/themes'
import { useCallback, useEffect, useState } from 'react'

const { borderRadius, flexSpaceBetween, spacing } = styleguide

export const NOTIFICATION_CONTAINER_ID = 'notification-root'

// Appends a div to the document, usually for use with React portals
// Optional popup container function can be provided as an argument. Otherwise, it defaults to appending the div to document.body
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
			const { duration = 3000 } = notificationConfig
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

			setTimeout(removeNotification, duration)
		},
		[]
	)

	return { generateNotification, notifications }
}

export const generateNotificationStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]
	const palette = themes[themeType]

	return {
		...flexSpaceBetween,
		background: palette.background.secondary,
		border: `1px solid ${base.borderColor}`,
		borderRadius,
		color: base.color,
		marginBottom: spacing.m,
		padding: spacing.m,
		position: 'relative',
		width: 384
	}
}

export const mappedTypesToIcons = {
	[NotificationTypes.error]: {
		icon: faTimesCircle
	},
	[NotificationTypes.info]: {
		icon: faExclamationCircle
	},
	[NotificationTypes.success]: {
		icon: faCheckCircle
	},
	[NotificationTypes.warning]: {
		icon: faExclamationTriangle
	}
}

export { NotificationTypes }
