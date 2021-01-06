import { ReactNode, useCallback, useState } from 'react'

export const MODAL_CONTAINER_ID = 'modal-root'

export interface ModalOptions {
	classes?: string[]
	disableKeyboardShortcut?: boolean
	hideCloseButton?: boolean
	onClose?: () => void
	overlay?: boolean
}

export interface ModalConfig {
	content: ReactNode
	options?: ModalOptions
}

export const useModalCmp = () => {
	const [modalConfig, setModalConfig] = useState<ModalConfig | undefined>()

	const unsetModal = useCallback(() => setModalConfig(undefined), [])

	return { modalConfig, setModalConfig, unsetModal }
}
