import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getRgba } from 'components/utils'
import noop from 'lodash/noop'
import {
	type Emitter,
	EmitterEventTypes,
	useClickOutside
} from '@dassana-io/web-utils'
import { IconButton, IconSizes } from 'components/IconButton'
import { type ModalConfig, themedModalStyles } from './utils'
import React, { type FC, useCallback, useEffect } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const { flexCenter, spacing } = styleguide

const useStyles = createUseStyles({
	closeButton: {
		position: 'absolute',
		right: spacing.l,
		top: spacing.m,
		zIndex: 10000
	},
	container: {
		'&$overlay': {
			background: getRgba(themedModalStyles(light).background, 0.6)
		},
		...flexCenter,
		...themedModalStyles(light),
		bottom: 0,
		height: '100%',
		left: 0,
		position: 'fixed',
		right: 0,
		top: 0,
		width: '100%',
		zIndex: 9999
	},
	contentContainer: {
		...flexCenter,
		height: '100%',
		width: '100%'
	},
	overlay: {},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				'&$overlay': {
					background: getRgba(themedModalStyles(dark).background, 0.6)
				},
				...themedModalStyles(dark)
			}
		}
	}
})

export interface ModalProps {
	emitter?: Emitter
	modalConfig: ModalConfig
	unsetModal: () => void
}

const Modal: FC<ModalProps> = ({
	emitter,
	modalConfig,
	unsetModal
}: ModalProps) => {
	const { content, options = {} } = modalConfig
	const {
		classes = [],
		contentContainerClasses = [],
		disableKeyboardShortcut = false,
		hideCloseButton = false,
		onClose,
		overlay = false
	} = options
	const modalClasses = useStyles()

	const onModalClose = useCallback(
		() => (onClose ? onClose() : unsetModal()),
		[onClose, unsetModal]
	)

	const ref = useClickOutside({
		callback: disableKeyboardShortcut ? noop : onModalClose
	})

	useEffect(() => {
		emitter && emitter.on(EmitterEventTypes.loggedOut, unsetModal)

		return () =>
			emitter && emitter.off(EmitterEventTypes.loggedOut, unsetModal)
	})

	return (
		<div
			className={cn(
				{
					[modalClasses.container]: true,
					[modalClasses.overlay]: overlay
				},
				classes
			)}
		>
			{!hideCloseButton && (
				<IconButton
					classes={[modalClasses.closeButton]}
					onClick={onModalClose}
					size={IconSizes.sm}
				/>
			)}
			<div
				className={cn(
					modalClasses.contentContainer,
					contentContainerClasses
				)}
				ref={ref}
			>
				{content}
			</div>
		</div>
	)
}

export default Modal
