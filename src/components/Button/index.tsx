import 'semantic-ui-css/semantic.min.css'
import classnames from 'classnames'
import React, { FC, ReactNode } from 'react'
export type ButtonType = 'submit' | 'button' | 'reset'

export interface ButtonProps {
	children?: ReactNode
	onClick: () => void
	primary?: boolean
	disabled?: boolean
	type?: ButtonType
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
