import { createUseStyles } from 'react-jss'
import FieldContext from './FieldContext'
import FormButton from './FormButton'
import FormInput, { FormInputProps } from './FormInput'
import { FormProvider, useForm } from 'react-hook-form'
import React, { FC, ReactNode, useEffect } from 'react'

const useStyles = createUseStyles({
	container: {
		'& >div:not(:last-child)': {
			paddingBottom: 15
		}
	}
})

export interface FormProps {
	children: ReactNode
	initialValues?: object
	loading?: boolean
	onSubmit: (data: any) => void
}

interface FormSubComponents {
	Button: FC
	Input: FC<FormInputProps>
}

const Form: FC<FormProps> & FormSubComponents = ({
	children,
	initialValues = {},
	loading = false,
	onSubmit
}: FormProps) => {
	const classes = useStyles()
	const methods = useForm()

	const { handleSubmit, reset } = methods

	useEffect(() => {
		reset(initialValues)
	}, [initialValues])

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldContext.Provider value={{ loading, onSubmit }}>
					<div className={classes.container}>{children}</div>
				</FieldContext.Provider>
			</form>
		</FormProvider>
	)
}

Form.Button = FormButton
Form.Input = FormInput

export default Form
