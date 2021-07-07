import { createPortal } from 'react-dom'
import { Emitter } from '@dassana-io/web-utils'
import Modal from './Modal'
import { getPopupContainerProps, useCreateDomElement } from 'components/utils'
import { MODAL_CONTAINER_ID, useModalCmp } from './utils'
import { ModalCtx, useModal } from './ModalContext'
import React, { FC, ReactNode } from 'react'

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
	const { modalConfig, setModalConfig, unsetModal } = useModalCmp()

	const rootElement = useCreateDomElement(
		MODAL_CONTAINER_ID,
		getPopupContainerProps(popupContainerSelector).getPopupContainer
	)

	return (
		<ModalCtx.Provider value={{ setModalConfig, unsetModal }}>
			{children}
			{modalConfig &&
				rootElement &&
				createPortal(
					<Modal
						emitter={emitter}
						modalConfig={modalConfig}
						unsetModal={unsetModal}
					/>,
					rootElement
				)}
		</ModalCtx.Provider>
	)
}

export { ModalProvider, useModal }

export type { ModalConfig, ModalOptions } from './utils'
