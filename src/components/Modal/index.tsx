import { type Emitter } from '@dassana-io/web-utils'
import { ModalWrapper } from './ModalWrapper'
import { getPopupContainerProps, useCreateDomElement } from 'components/utils'
import { MODAL_CONTAINER_ID, type ModalConfig, useModalCmp } from './utils'
import { ModalCtx, useModal } from './ModalContext'
import React, { type FC, type ReactNode } from 'react'

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
