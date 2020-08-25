import FieldContext from '../FieldContext'
import { useFormContext } from 'react-hook-form'
import Button, { ButtonProps } from '../../Button'
import React, { FC, useContext } from 'react'

export type FormButtonProps = Omit<
	ButtonProps,
	'rendering' | 'onClick' | 'children'
>

const FormButton: FC<FormButtonProps> = (props: FormButtonProps) => {
	const { handleSubmit } = useFormContext()
	const { loading, onSubmit } = useContext(FieldContext)

	return (
		<Button onClick={handleSubmit(onSubmit)} rendering={loading} {...props}>
			Submit
		</Button>
	)
}

export default FormButton
