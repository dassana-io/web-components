import { BaseFormElementProps } from '../../types'
import { CSSProperties } from 'react'
import { IconName } from '../../Icon'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

export interface SelectOption {
	iconKey?: IconName
	style?: CSSProperties
	text: string
	value: string
}

export interface SelectOptionsConfig {
	iconMap?: Record<string, string>
	style?: CSSProperties
}

export interface SelectProps extends BaseFormElementProps<HTMLSelectElement> {
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
	focused?: boolean
	/**
	 * Sets the width of the select to be same as the selected content width. Can be false or a number which will be used as the minimum width
	 */
	matchSelectedContentWidth?: false | number
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	onFocus?: () => void
	/**
	 * Array of options to be rendered in the dropdown
	 */
	options: SelectOption[]
	/**
	 * Optional configuration that applies to the options. Ex: An icon map where each key in the map corresponds to the value of the option
	 * @default {}
	 */
	optionsConfig?: SelectOptionsConfig
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
