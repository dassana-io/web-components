import FieldContext from '../FieldContext'
import { useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from 'components/Button'
import React, { FC, useContext } from 'react'

export type FormButtonProps = Omit<ButtonProps, 'loading' | 'onClick'>

const FormSubmitButton: FC<FormButtonProps> = (props: FormButtonProps) => {
	const { handleSubmit, formState } = useFormContext()
	const { loading, onSubmit } = useContext(FieldContext)
	const { isDirty } = formState

	return (
		<Button
			dataTag='submit-button'
			disabled={!isDirty}
			loading={loading}
			onClick={handleSubmit(onSubmit)}
			{...props}
		/>
	)
}

export default FormSubmitButton
