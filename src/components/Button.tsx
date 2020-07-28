import React, { FC, ReactNode } from 'react'

type ButtonProps = {
	children?: ReactNode
	text: string
	onClick: () => void
	primary?: boolean
	type?: 'submit' | 'button' | 'reset'
	classes?: string
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
	const { children, text, onClick, primary, type, classes } = props

	const btnClass = `ui button ${primary ? 'primary' : ''} ${classes}`

	return (
		<button className={btnClass} onClick={onClick} type={type}>
			{children}
			{text}
		</button>
	)
}

Button.defaultProps = {
	primary: true,
	classes: '',
	type: 'button'
}

export default Button
