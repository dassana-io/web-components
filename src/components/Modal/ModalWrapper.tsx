import { createPortal } from 'react-dom'
import { isEmpty } from 'lodash'
import { ModalConfig } from './utils'
import { AnimatePresence, motion } from 'framer-motion'
import Modal, { ModalProps } from './Modal'
import React, { FC } from 'react'
import { ModalDrawer } from './ModalDrawer'

const sideVariants = {
	closed: {
		transition: {
			staggerChildren: 0.2,
			staggerDirection: -1
		}
	},
	open: {
		transition: {
			staggerChildren: 0.2,
			staggerDirection: 1
		}
	}
}

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
