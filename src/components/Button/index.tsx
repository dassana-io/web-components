import React, { FC } from 'react'
import classnames from 'classnames'

export interface ButtonProps {
	onClick: () => void
	primary?: boolean
	disabled?: boolean
	type?: 'submit' | 'button' | 'reset'
	classes?: string[]
}

const Button: FC<ButtonProps> = ({
	children,
	onClick,
	primary = false,
	disabled = false,
	type = 'button',
	classes = []
}) => {
	const btnClass: string = classnames(
		{
			ui: true,
			button: true,
			primary,
			disabled
		},
		classes
	)

	return (
		<button
			disabled={disabled}
			className={btnClass}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

export default Button
