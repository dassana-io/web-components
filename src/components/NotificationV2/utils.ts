import { ev as NotificationTypes } from '@dassana-io/web-utils'
import omit from 'lodash/omit'
import { v4 as uuidV4 } from 'uuid'
import {
	faCircleCheck,
	faCircleExclamation,
	faCircleX,
	faTriangleExclamation
} from '@fortawesome/pro-light-svg-icons'
import { type ReactNode, useCallback, useState } from 'react'
import {
	styleguide,
	themedStyles,
	themes,
	type ThemeType
} from '../assets/styles'

const { borderRadius, flexSpaceBetween, spacing } = styleguide

export const NOTIFICATION_CONTAINER_ID = 'notification-root'

export interface NotificationConfig {
	duration?: number
	message: string | ((onClose: () => void) => ReactNode)
	standalone?: boolean
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
			const { duration = 3000, standalone = false } = notificationConfig
			const processedConfig = omit(notificationConfig, 'duration')
			const id = uuidV4()

			const removeNotification = () => {
				setNotifications((notifications: ProcessedNotification[]) =>
					notifications.filter(notification => notification.id !== id)
				)
			}

			setNotifications((notifications: ProcessedNotification[]) => {
				const newNotification = {
					...processedConfig,
					id,
					onClose: removeNotification
				}

				const notificationsList = standalone
					? [
							{
								...processedConfig,
								id,
								onClose: removeNotification
							}
					  ] // eslint-disable-line no-mixed-spaces-and-tabs
					: [...notifications, newNotification]

				return notificationsList
			})

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
		icon: faCircleX
	},
	[NotificationTypes.info]: {
		icon: faCircleExclamation
	},
	[NotificationTypes.success]: {
		icon: faCircleCheck
	},
	[NotificationTypes.warning]: {
		icon: faTriangleExclamation
	}
}

export { NotificationTypes }
