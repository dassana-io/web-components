import { BaseFormElementProps } from '../types'
import { RefObject } from 'react'

export interface MultipleChoiceItemConfig {
	label: string
	value: string
}

export interface SharedProps
	extends Pick<BaseFormElementProps, 'classes' | 'dataTag' | 'loading'> {
	/**
	 * Optional callback that returns ref of element to which attach event listener to. By default, it's attached to the window
	 */
	getEventTarget?: () => RefObject<HTMLElement>
	items: MultipleChoiceItemConfig[]
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	skeletonItemCount?: number
	/**
	 * The number of items at which items split into two columns
	 * @default 8
	 */
	singleColumnItemsCount?: number
}

export interface SingleProps extends SharedProps {
	defaultValue?: string
	onChange?: (value: string) => void
	value?: string
}

export interface MultipleProps extends SharedProps {
	/**
	 * Default selected values for multi choice component. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	onChange?: (values: string[]) => void
	values?: string[]
}

export interface MultipleChoiceProps extends SharedProps {
	defaultValue?: SingleProps['defaultValue'] | MultipleProps['defaultValues']
	mode: 'multiple' | 'single'
	onChange?: SingleProps['onChange'] | MultipleProps['onChange']
	value?: SingleProps['value'] | MultipleProps['values']
}
