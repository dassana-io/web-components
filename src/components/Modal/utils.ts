import { type ReactNode, useCallback, useState } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { light } = ThemeType

const {
	colors: { blacks, grays }
} = styleguide

export const MODAL_CONTAINER_ID = 'modal-root'

export interface ModalOptions {
	animate?: boolean
	classes?: string[]
	contentContainerClasses?: string[]
	disableKeyboardShortcut?: boolean
	drawer?: boolean
	drawerStyles?: Record<string, string>
	hideCloseButton?: boolean
	onClose?: () => void
	overlay?: boolean
	overlayClasses?: string[]
	overlayStyles?: Record<string, string>
}

export interface ModalConfig {
	content: ReactNode
	options?: ModalOptions
}

export const themedModalStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	return {
		background:
			themeType === light ? grays['lighten-40'] : blacks['darken-40'],
		color
	}
}

export const useModalCmp = () => {
	const [modalConfig, setModalConfig] = useState<ModalConfig | undefined>()

	const unsetModal = useCallback(() => setModalConfig(undefined), [])

	return { modalConfig, setModalConfig, unsetModal }
}
