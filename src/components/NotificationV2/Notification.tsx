import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from 'components/IconButton'
import { domAnimation, LazyMotion, m as motion } from 'framer-motion'
import {
	generateNotificationStyles,
	mappedTypesToIcons,
	type ProcessedNotification
} from './utils'
import React, { type FC } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	colors: { oranges, reds, greens },
	font,
	spacing
} = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: generateNotificationStyles(light),
	error: { color: reds.base },
	icon: {
		...font.h2
	},
	info: { color: themedStyles[light].base.color },
	message: {
		alignSelf: 'center',
		padding: `0 ${spacing.m}px`,
		width: '100%'
	},
	success: { color: greens.base },
	warning: { color: oranges.base },
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateNotificationStyles(dark),
			'& $info': { color: themedStyles[dark].base.color }
		}
	}
})

export interface NotificationConfigProps {
	closeBtnClasses?: string[]
	notificationClasses?: string[]
}

type NotificationProps = ProcessedNotification & NotificationConfigProps

export const Notification: FC<NotificationProps> = (
	props: NotificationProps
) => {
	const {
		closeBtnClasses = [],
		notificationClasses = [],
		message,
		onClose,
		type
	} = props
	const classes = useStyles(props)

	const iconClasses = cn({
		[classes.icon]: true,
		[classes[type]]: true
	})

	const closeButtonClasses = cn(closeBtnClasses)

	const containerClasses = cn(
		{
			[classes.container]: true
		},
		notificationClasses
	)

	return (
		<LazyMotion features={domAnimation}>
			<motion.div
				animate={{ opacity: 1, scale: 1, x: 0 }}
				className={containerClasses}
				exit={{ opacity: 0, scale: 0.8, x: 300 }}
				initial={{ opacity: 0, scale: 0.8, x: 300 }}
				transition={{
					damping: 40,
					stiffness: 500,
					type: 'spring'
				}}
			>
				<FontAwesomeIcon
					className={iconClasses}
					icon={mappedTypesToIcons[type].icon}
				/>
				<div className={classes.message}>
					{typeof message === 'string' ? message : message(onClose)}
				</div>
				<IconButton classes={[closeButtonClasses]} onClick={onClose} />
			</motion.div>
		</LazyMotion>
	)
}
