import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { type ModalProps } from './Modal'
import { motion } from 'framer-motion'
import { themedModalStyles } from './utils'
import { useClickOutside } from '@dassana-io/web-utils'
import React, { type FC, useCallback } from 'react'
import { styleguide, themes, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const { flexCenter } = styleguide

const useStyles = createUseStyles({
	contentContainer: {
		...flexCenter,
		...themedModalStyles(light),
		borderLeft: `1px solid ${themes[light].border}`,
		height: '100vh',
		position: 'fixed',
		right: 0,
		top: 0,
		width: '40%',
		zIndex: 9999
	},
	overlay: {
		...flexCenter,
		...themedModalStyles(light),
		height: '100%',
		left: 0,
		position: 'fixed',
		top: 0,
		width: '60%',
		zIndex: 9999
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $contentContainer': {
				...themedModalStyles(dark),
				borderLeft: `1px solid ${themes[dark].border}`
			},
			'& $overlay': {
				...themedModalStyles(dark)
			}
		}
	}
})

const drawerAnimations = {
	animate: {
		x: 0
	},
	exit: {
		x: '100%'
	},
	initial: {
		x: '100%'
	},
	transition: {
		bounce: 0,
		duration: 0.4,
		type: 'spring'
	}
}

const overlayAnimations = {
	animate: {
		opacity: 0.5
	},
	exit: {
		opacity: 0,
		transition: {
			delay: 0
		}
	},
	initial: {
		opacity: 0
	},
	transition: {
		bounce: 0,
		delay: 1,
		duration: 0.2,
		type: 'spring'
	}
}

export const ModalDrawer: FC<ModalProps> = ({
	modalConfig,
	unsetModal
}: ModalProps) => {
	const { content, options = {} } = modalConfig

	const {
		animate = true,
		contentContainerClasses = [],
		drawerStyles,
		onClose,
		overlayClasses = [],
		overlayStyles = {}
	} = options

	const onModalClose = useCallback(
		() => (onClose ? onClose() : unsetModal()),
		[onClose, unsetModal]
	)

	const ref = useClickOutside({
		callback: onModalClose
	})

	const modalClasses = useStyles()

	const additionalDrawerProps = animate ? drawerAnimations : {}
	const additionalOverlayProps = animate ? overlayAnimations : {}

	return (
		<>
			<motion.div
				className={cn(
					modalClasses.contentContainer,
					contentContainerClasses
				)}
				ref={ref}
				style={drawerStyles}
				{...additionalDrawerProps}
			>
				{content}
			</motion.div>
			<motion.div
				className={cn(modalClasses.overlay, overlayClasses)}
				onClick={onModalClose}
				style={overlayStyles}
				{...additionalOverlayProps}
			/>
		</>
	)
}
