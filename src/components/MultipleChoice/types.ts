import { BaseFormElementProps } from 'components/types'
import { Key } from 'react'

export interface MultipleChoiceItemConfig {
	key: Key
	label: string
}

export interface MultipleChoiceProps
	extends Pick<BaseFormElementProps, 'classes'> {
	defaultSelected?: Key[]
	items: MultipleChoiceItemConfig[]
	onChange: (selectedKeys: Key[]) => void
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
}
