import { BaseFormElementProps } from 'components/types'
import { Key } from 'react'

export interface MultipleChoiceItemConfig {
	key: Key
	label: string
}

export interface MultipleChoiceProps
	extends Pick<BaseFormElementProps, 'classes' | 'dataTag'> {
	/**
	 * Default selected keys for multi choice component. Gets overwritten by keys if both are provided
	 */
	defaultSelectedKeys?: Key[]
	items: MultipleChoiceItemConfig[]
	onChange: (selectedKeys: Key[]) => void
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	keys: Key[]
}
