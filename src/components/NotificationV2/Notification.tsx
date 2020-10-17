import { createUseStyles } from 'react-jss'
import { motion } from 'framer-motion'
import { ThemeType } from 'components/assets/styles'
import {
	generatePartialNotificationStyles,
	ProcessedNotification
} from './utils'
import React, { FC } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	closeButton: {
		cursor: 'pointer'
	},
	container: generatePartialNotificationStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generatePartialNotificationStyles(dark)
		}
	}
})

export type NotificationProps = ProcessedNotification

export const Notification: FC<NotificationProps> = (
	props: NotificationProps
) => {
	const { message, onClose } = props
	const classes = useStyles(props)

	return (
		<motion.div
			animate={{ opacity: 1, scale: 1, x: 0 }}
			className={classes.container}
			exit={{ opacity: 0, scale: 0.8, x: 300 }}
			initial={{ opacity: 0, scale: 0.8, x: 300 }}
			transition={{
				damping: 40,
				stiffness: 500,
				type: 'spring'
			}}
		>
			{message}
			<div className={classes.closeButton} onClick={onClose}>
				X
			</div>
		</motion.div>
	)
}
