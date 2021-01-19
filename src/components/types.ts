import { ChangeEventHandler } from 'react'

export interface BaseFormElementProps extends CommonComponentProps {
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
	 * Callback that runs when element loses focus
	 * @default () => {}
	 */
	onBlur?: ChangeEventHandler
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

/**
 * This interface allows devs to pass in a dataTag that will be appended to the end of the data-test attribute.
 * The data-test attribute is used for QA automation purposes and allows the component to be queried by its identifier.
 * Each component that a user can interact with should have props that extend this interface
 */
export interface CommonComponentProps {
	dataTag?: string
}
