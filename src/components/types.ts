import { ChangeEventHandler } from 'react'

export interface BaseFormElementProps {
	/**
	 * Array of classes to pass to element
	 * @default []
	 */
	classes?: string[]
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events)
	 * @default false
	 */
	disabled?: boolean
	/**
	 * Whether or not to show error state and animation
	 * @default false
	 */
	error?: boolean
	/**
	 * Whether or not element spans the full width of the parent container
	 * @default false
	 */
	fullWidth?: boolean
	/**
	 * Whether or not to show skeleton loader
	 * @default false
	 */
	loading?: boolean
	/**
	 * Callback that runs when element is updated
	 * @default () => {}
	 */
	onChange?: ChangeEventHandler
	/**
	 * Describes expected value of element
	 */
	placeholder?: string
	/**
	 * Element content value for controlled input elements. Requires an onChange to be passed
	 */
	value?: string
}
