import { SelectProps } from 'components/Select'

export interface MultiSelectProps
	extends Omit<SelectProps, 'onChange' | 'defaultValue' | 'value'> {
	allowClear?: boolean
	/**
	 * Default values for select component. Without this, the select dropdown will be blank until an option is selected. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	/**
	 * The number after which to show "& 'x' more" for selected tags. Setting it to 0 will always show all selected tags in the input
	 * @default 2
	 */
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
	pending?: boolean
	searchPlaceholder?: string
	/**
	 * Selected values for if component is controlled. Requires an onChange to be passed
	 */
	values?: string[]
}
