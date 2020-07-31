import React, { FC, useState, useEffect } from 'react'

interface ButtonProps {
	onClick?: () => void
	primary?: boolean
	disabled?: boolean
	type?: 'submit' | 'button' | 'reset'
	classes?: string
}

const Button: FC<ButtonProps> = ({
	children,
	onClick,
	primary = false,
	disabled = false,
	type = 'button',
	classes = ''
}) => {
	const [isGoogleBtn, setIsGoogleBtn] = useState(false)

	useEffect(() => {
		if (classes.includes('google')) setIsGoogleBtn(true)
	}, [classes])

	const createButtonClasses = () => {
		let btnClassArr = ['ui', 'button']
		if (primary) btnClassArr.push('primary')
		if (disabled) btnClassArr.push('disabled')
		if (classes) btnClassArr.push(...classes.split(' '))
		if (isGoogleBtn) btnClassArr.push('red')

		return btnClassArr.join(' ')
	}

	return (
		<button className={createButtonClasses()} onClick={onClick} type={type}>
			{isGoogleBtn && <i className='google icon'></i>}
			{children}
		</button>
	)
}

export default Button
