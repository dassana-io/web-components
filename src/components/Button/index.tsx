import 'semantic-ui-css/semantic.min.css'
import classnames from 'classnames'
import React, { FC, ReactNode } from 'react'
export type ButtonType = 'submit' | 'button' | 'reset'

export interface ButtonProps {
	/**
	 * Button children to render including button text.
	 */
	children?: ReactNode
	/**
	 * Required click handler.
	 */
	onClick: () => void
	/**
	 * Whether button is of primary type. **Note**: Setting primary to true will override background color set by classes.
	 */
	primary?: boolean
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events). */
	disabled?: boolean
	type?: ButtonType
	/**
	 * Array of classes to pass to button.
	 */
	classes?: string[]
}

const Button: FC<ButtonProps> = ({
	children,
	onClick,
	primary = false,
	disabled = false,
	type = 'button',
	classes = []
}: ButtonProps) => {
	const btnClass: string = classnames(
		{
			button: true,
			disabled,
			primary,
			ui: true
		},
		classes
	)

	return (
		<button
			className={btnClass}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
