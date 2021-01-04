import { BaseFormElementProps } from '../types'

export interface MultiSelectOption {
	text: string
	value: string
}

export interface MultiSelectProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	allowClear?: boolean
	/**
	 * Default values for select component. Without this, the select dropdown will be blank until an option is selected. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	/**
	 * Sets the width of the select to be same as the selected content width. Can be false or a number which will be used as the minimum width
	 */
	matchSelectedContentWidth?: false | number
	maxTagCount?: number
	maxTagTextLength?: number
	/**
	 * Array of options to be rendered in the dropdown
	 */
	onChange?: (values: string[]) => void
	onSearch?: (value: string) => void
	/**
	 * Only valid if showSearch is true and and onSearch is not passed. By default options are only filtered by text. To filter by other keys, pass an array of keys to filter. Eg. ['value']
	 * @default ['text']
	 */
	optionKeysToFilter?: string[]
	options: MultiSelectOption[]
	pending?: boolean
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	searchPlaceholder?: string
	/**
	 * Whether or not to show search input
	 * @default false
	 */
	showSearch?: boolean
	/**
	 * Selected values for if component is controlled. Requires an onChange to be passed
	 */
	values?: string[]
}
