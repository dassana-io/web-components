import { createUseStyles } from 'react-jss'
import { motion } from 'framer-motion'
import { generateNotificationStyles, ProcessedNotification } from './utils'
import React, { FC } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const {
	colors: { blacks },
	font,
	spacing
} = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	closeButton: {
		...font.label,
		'&:hover': {
			color: blacks['lighten-30']
		},
		alignSelf: 'flex-end',
		color: blacks['lighten-70'],
		cursor: 'pointer',
		lineHeight: 1,
		position: 'absolute',
		right: spacing.s,
		top: spacing.s
	},
	container: generateNotificationStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $closeButton': {
				'&:hover': {
					color: blacks['lighten-40']
				},
				color: blacks['lighten-20']
			},
			'& $container': generateNotificationStyles(dark)
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
