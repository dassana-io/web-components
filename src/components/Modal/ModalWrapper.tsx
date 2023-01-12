import { AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { isEmpty } from 'lodash'
import { ModalConfig } from './utils'
import { ModalDrawer } from './ModalDrawer'
import Modal, { ModalProps } from './Modal'
import React, { FC } from 'react'

interface ModalWrapperProps extends ModalProps {
	rootEl: HTMLDivElement | null
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
	rootEl,
	...rest
}: ModalWrapperProps) => {
	const { modalConfig = {} as ModalConfig } = rest

	const { options = {} } = modalConfig

	const { drawer = false } = options

	return (
		rootEl &&
		createPortal(
			<AnimatePresence>
				{!isEmpty(modalConfig) ? (
					drawer ? (
						<ModalDrawer {...rest} />
					) : (
						<Modal {...rest} />
					)
				) : null}
			</AnimatePresence>,
			rootEl
		)
	)
}
