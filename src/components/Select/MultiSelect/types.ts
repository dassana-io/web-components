import { type RefObject } from 'react'
import { type SelectProps } from '../SingleSelect/types'

export interface MultiSelectProps
	extends Omit<SelectProps, 'onChange' | 'defaultValue' | 'value'> {
	/**
	 * Default values for select component. Without this, the select dropdown will be blank until an option is selected. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	dropdownRef?: RefObject<HTMLDivElement>
	focused?: boolean
	/**
	 * The number after which to show "& 'x' more" for selected tags. Setting it to 0 will always show all selected tags in the input
	 * @default 2
	 */
	maxTagCount?: number
	maxTagTextLength?: number
	onDropdownClose?: () => void
	onDropdownOpen?: () => void
	onChange?: (values: string[]) => void
	onFocus?: () => void
	onSearch?: (value: string) => void
	/**
	 * Only valid if showSearch is true and and onSearch is not passed. By default options are only filtered by text. To filter by other keys, pass an array of keys to filter. Eg. ['value']
	 * @default ['text']
	 */
	optionKeysToFilter?: string[]
	pending?: boolean
	searchPlaceholder?: string
	sortOptions?: boolean
	/**
	 * Selected values if component is controlled. Requires an onChange to be passed
	 */
	values?: string[]
}
