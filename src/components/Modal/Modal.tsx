import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import noop from 'lodash/noop'
import { useClickOutside } from './useClickOutside'
import { Emitter, EmitterEventTypes } from '@dassana-io/web-utils'
import { IconButton, IconSizes } from 'components/IconButton'
import { ModalConfig, themedModalStyles } from './utils'
import React, { FC, useCallback, useEffect, useRef } from 'react'
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
	contentContainer: {
		...flexCenter,
		height: '100%',
		width: '100%'
	},
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
		contentContainerClasses = [],
		disableKeyboardShortcut = false,
		hideCloseButton = false,
		onClose,
		overlay = false
	} = options
	const modalClasses = useStyles({ overlay })

	const onModalClose = useCallback(
		() => (onClose ? onClose() : unsetModal()),
		[onClose, unsetModal]
	)

	const containingRef = useRef<HTMLDivElement>(null)

	const ref = useClickOutside({
		callback: disableKeyboardShortcut ? noop : onModalClose,
		containingRef
	})

	useEffect(() => {
		emitter && emitter.on(EmitterEventTypes.loggedOut, unsetModal)

		return () =>
			emitter && emitter.off(EmitterEventTypes.loggedOut, unsetModal)
	})

	return (
		<div
			className={cn({ [modalClasses.container]: true }, classes)}
			ref={containingRef}
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
