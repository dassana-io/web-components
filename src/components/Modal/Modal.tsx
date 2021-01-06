import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { ModalConfig } from './utils'
import noop from 'lodash/noop'
import {
	Emitter,
	EmitterEventTypes,
	useShortcut,
	useTheme
} from '@dassana-io/web-utils'
import { IconButton, IconSizes } from 'components/IconButton'
import React, { FC, useEffect } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { flexCenter, spacing } = styleguide

const useStyles = createUseStyles({
	closeButton: {
		position: 'absolute',
		right: spacing.l,
		top: spacing.m,
		zIndex: 10000
	},
	container: ({
		overlay,
		theme
	}: {
		overlay: boolean
		theme: ThemeType
	}) => ({
		...flexCenter,
		background: themedStyles[theme].base.backgroundColor,
		bottom: 0,
		color: themedStyles[theme].base.color,
		height: '100%',
		left: 0,
		opacity: overlay ? 0.6 : 1,
		position: 'fixed',
		right: 0,
		top: 0,
		width: '100%',
		zIndex: 9999
	})
})

interface ModalProps {
	emitter: Emitter
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
	const theme = useTheme(emitter)
	const modalClasses = useStyles({ overlay, theme })

	const onModalClose = () => (onClose ? onClose() : unsetModal())

	useShortcut({
		callback: disableKeyboardShortcut ? noop : onModalClose,
		key: 'Escape',
		keyEvent: 'keydown'
	})

	useEffect(() => {
		emitter.on(EmitterEventTypes.loggedOut, unsetModal)

		return () => emitter.off(EmitterEventTypes.loggedOut, unsetModal)
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
