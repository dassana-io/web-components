import { createPortal } from 'react-dom'
import { Emitter } from '@dassana-io/web-utils'
import Modal from './Modal'
import { AnimatePresence, motion } from 'framer-motion'
import { getPopupContainerProps, useCreateDomElement } from 'components/utils'
import { MODAL_CONTAINER_ID, ModalConfig, useModalCmp } from './utils'
import { ModalCtx, useModal } from './ModalContext'
import React, { FC, ReactNode } from 'react'
import { isEmpty } from 'lodash'
import { ModalWrapper } from './ModalWrapper'

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

export interface Props {
	children: ReactNode
	emitter?: Emitter
	popupContainerSelector?: string
}

const ModalProvider: FC<Props> = ({
	children,
	emitter,
	popupContainerSelector
}: Props) => {
	const {
		modalConfig = {} as ModalConfig,
		setModalConfig,
		unsetModal
	} = useModalCmp()

	const { options = {} } = modalConfig

	const { drawer = false } = options

	const rootElement = useCreateDomElement(
		MODAL_CONTAINER_ID,
		getPopupContainerProps(popupContainerSelector).getPopupContainer
	)

	return (
		<ModalCtx.Provider value={{ setModalConfig, unsetModal }}>
			{children}
			<ModalWrapper
				emitter={emitter}
				modalConfig={modalConfig}
				rootEl={rootElement}
				unsetModal={unsetModal}
			/>
		</ModalCtx.Provider>
	)
}

export { ModalProvider, useModal }

export type { ModalConfig, ModalOptions } from './utils'
