import { BaseFormElementProps } from 'components/types'
import { Key, RefObject } from 'react'

export interface MultipleChoiceItemConfig {
	key: Key
	label: string
}

export interface MultipleChoiceProps
	extends Pick<BaseFormElementProps, 'classes' | 'dataTag' | 'loading'> {
	/**
	 * Default selected keys for multi choice component. Gets overwritten by keys if both are provided
	 */
	defaultSelectedKeys?: Key[]
	/**
	 * Optional callback that returns ref of element to which attach event listener to. By default, it's attached to the window
	 */
	getEventTarget?: () => RefObject<HTMLElement>
	items: MultipleChoiceItemConfig[]
	onChange: (selectedKeys: Key[]) => void
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	keys: Key[]
	skeletonItemCount?: number
}
