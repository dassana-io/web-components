import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import noop from 'lodash/noop'
import { Emitter, EmitterEventTypes, useShortcut } from '@dassana-io/web-utils'
import { IconButton, IconSizes } from 'components/IconButton'
import { ModalConfig, themedModalStyles } from './utils'
import React, { FC, useEffect } from 'react'
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
	container: ({ overlay }: { overlay: boolean }) => ({
		...flexCenter,
		...themedModalStyles(light),
		bottom: 0,
		height: '100%',
		left: 0,
		opacity: overlay ? 0.6 : 1,
		position: 'fixed',
		right: 0,
		top: 0,
		width: '100%',
		zIndex: 9999
	}),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': themedModalStyles(dark)
		}
	}
})

interface ModalProps {
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
		disableKeyboardShortcut = false,
		hideCloseButton = false,
		onClose,
		overlay = false
	} = options
	const modalClasses = useStyles({ overlay })

	const onModalClose = () => (onClose ? onClose() : unsetModal())

	useShortcut({
		callback:
			disableKeyboardShortcut || hideCloseButton ? noop : onModalClose,
		key: 'Escape',
		keyEvent: 'keydown'
	})

	useEffect(() => {
		emitter && emitter.on(EmitterEventTypes.loggedOut, unsetModal)

		return () =>
			emitter && emitter.off(EmitterEventTypes.loggedOut, unsetModal)
	})

	return (
		<div className={cn({ [modalClasses.container]: true }, classes)}>
			{!hideCloseButton && (
				<IconButton
					classes={[modalClasses.closeButton]}
					onClick={onModalClose}
					size={IconSizes.sm}
				/>
			)}
			{content}
		</div>
	)
}

export default Modal
