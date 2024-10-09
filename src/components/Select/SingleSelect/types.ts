import { type BaseFormElementProps } from '../../types'
import { type IconName } from '../../Icon'
import { type SizeType } from 'antd/lib/config-provider/SizeContext'
import { type CSSProperties, type ReactNode, type RefObject } from 'react'

export interface SelectOption {
	classes?: string[]
	disabled?: boolean
	hidden?: boolean
	iconKey?: IconName | string
	iconUrl?: string
	style?: CSSProperties
	text: ReactNode
	value: string
}

export interface SelectOptionsConfig {
	iconMap?: Record<string, string>
	style?: CSSProperties
}

export interface SelectProps
	extends Omit<BaseFormElementProps<HTMLSelectElement>, 'placeholder'> {
	/**
	 * Array of classes to pass to element's container
	 * @default []
	 */
	containerClasses?: string[]
	/**
	 * Whether or not to menu is open by default
	 * @default false
	 */
	defaultOpen?: boolean
	/**
	 * Default value for select component. Without this, the select dropdown will be blank until an option is selected
	 */
	defaultValue?: string
	/**
	 * Array of classes to pass to element's dropdown container
	 * @default []
	 */
	dropdownContainerClasses?: string[]
	dropdownRef?: RefObject<HTMLDivElement>
	dropdownOnSearchClasses?: string[]
	filterOption?: boolean
	focused?: boolean
	isSearching?: boolean
	/**
	 * Sets the width of the select to be same as the selected content width. Can be false or a number which will be used as the minimum width
	 */
	matchSelectedContentWidth?: false | number
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	onDropdownClose?: () => void
	onDropdownOpen?: () => void
	onFocus?: () => void
	onSearch?: (value: string) => void
	open?: boolean
	/**
	 * Array of options to be rendered in the dropdown
	 */
	options?: SelectOption[]
	/**
	 * Optional configuration that applies to the options. Ex: An icon map where each key in the map corresponds to the value of the option
	 * @default {}
	 */
	optionsConfig?: SelectOptionsConfig
	placeholder?: ReactNode
	searchPlaceholder?: string
	searchValue?: string
	/**
	 * Whether or not to show search input
	 * @default false
	 */
	showSearch?: boolean
	/**
	 * Select size — small, medium, large
	 * @default undefined
	 */
	size?: SizeType
	/**
	 * Input content value for controlled inputs. Requires an onChange to be passed
	 */
	value?: string
}
