import { CommonComponentProps } from '../types'
import { predefinedKeysMap } from './utils'
import { ReactNode, RefObject } from 'react'

export type PredefinedShortcutKey = keyof typeof predefinedKeysMap

export interface ShortcutKeyItem {
	text?: string
	icon: ReactNode
}

export type ShortcutKey = PredefinedShortcutKey | ShortcutKeyItem

export interface ShortcutMicrocopyProps extends CommonComponentProps {
	classes?: string[]
	hideLabel?: boolean
	loading?: boolean
	/**
	 * Array of shortcut key items({ text?: string, icon: string}) or predefined shortcut keys(string). E.g. ['enter', {'icon': 'A'}] will render "press enter ↵ + A"
	 * @default ['enter']
	 */
	items?: [ShortcutKey, ...ShortcutKey[]] // this forces you to pass at least one item - otherwise throws ts error
	shortcutMicrocopyRef?: RefObject<HTMLDivElement>
	skeletonWidth?: number
}
