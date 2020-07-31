import React, { FC, useState, useEffect } from 'react'

interface ButtonProps {
	onClick: () => void
	primary?: boolean
	disabled?: boolean
	type?: 'submit' | 'button' | 'reset'
	classes?: Array<string>
}

const Button: FC<ButtonProps> = ({
	children,
	onClick,
	primary = false,
	disabled = false,
	type = 'button',
	classes = []
}) => {
	const [isGoogleBtn, setIsGoogleBtn] = useState(false)

	useEffect(() => {
		if (classes.includes('google')) setIsGoogleBtn(true)
	}, [classes])

	const createButtonClasses = () => {
		const classesArr = [
			primary && 'primary',
			disabled && 'disabled',
			isGoogleBtn && 'red',
			'ui',
			'button',
			...classes
		]
		return classesArr.filter(c => !!c).join(' ')
	}

	return (
		<button className={createButtonClasses()} onClick={onClick} type={type}>
			{isGoogleBtn && <i className='google icon'></i>}
			{children}
		</button>
	)
}

export default Button
