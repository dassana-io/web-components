import { createContext, useContext } from 'react'
import { ModalConfig, ModalOptions } from './utils'

export interface ModalContextProps {
	options?: ModalOptions
	setModalConfig: (config: ModalConfig) => void
	unsetModal: () => void
}

const ModalCtx = createContext<ModalContextProps>({} as ModalContextProps)

const useModal = (): ModalContextProps => useContext(ModalCtx)

export { ModalCtx, useModal }
