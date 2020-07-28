import React, { FC } from 'react'

interface InputProps {
	id: string
	label?: string
	type?: string
	placeholder?: string
}

const Input: FC<InputProps> = (props: InputProps) => {
	const { type, placeholder, id, label } = props

	return (
		<div className='ui labeled input'>
			<label className='ui label label' htmlFor={id}>
				{label}
			</label>
			<input id={id} type={type} placeholder={placeholder} />
		</div>
	)
}

Input.defaultProps = {
	type: 'text',
	placeholder: 'search...',
	label: 'Label'
}

export default Input
