import { BaseFormElementProps } from '../../types'
import { IconName } from '../../Icon'

export interface SelectOption {
	iconKey?: IconName
	text: string
	value: string
}

export interface SelectOptionsConfig {
	iconMap?: Record<string, string>
}

export interface SelectProps extends BaseFormElementProps {
	/**
	 * Default value for select component. Without this, the select dropdown will be blank until an option is selected
	 */
	defaultValue?: string
	/**
	 * Sets the width of the select to be same as the selected content width. Can be false or a number which will be used as the minimum width
	 */
	matchSelectedContentWidth?: false | number
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
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
	 * Input content value for controlled inputs. Requires an onChange to be passed
	 */
	value?: string
}
