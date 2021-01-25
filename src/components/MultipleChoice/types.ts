import { BaseFormElementProps } from 'components/types'
import { RefObject } from 'react'

export interface MultipleChoiceItemConfig {
	label: string
	value: string
}

export interface SharedMultiChoiceProps
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
}

export interface SingleMultiChoiceProps extends SharedMultiChoiceProps {
	defaultValue?: string
	mode: 'single'
	onChange?: (value: string) => void
	value?: string
}

export interface MultipleMultipleChoiceProps extends SharedMultiChoiceProps {
	/**
	 * Default selected values for multi choice component. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	mode?: 'multiple'
	onChange?: (values: string[]) => void
	values?: string[]
}

export type MultipleChoiceProps =
	| MultipleMultipleChoiceProps
	| SingleMultiChoiceProps
