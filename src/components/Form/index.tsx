import { createUseStyles } from 'react-jss'
import FieldContext from './FieldContext'
import { FieldValues } from 'react-hook-form/dist/types/form'
import FormButton from './FormButton'
import FormInput from './FormInput'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import React, { ReactNode } from 'react'

const useStyles = createUseStyles({
	container: {
		'& >div:not(:last-child)': {
			paddingBottom: 15
		}
	}
})

export interface FormProps<Model> {
	children: ReactNode
	initialValues?: Model
	loading?: boolean
	onSubmit: SubmitHandler<FieldValues>
}

function Form<Model>({
	children,
	initialValues = {} as Model,
	loading = false,
	onSubmit
}: FormProps<Model>) {
	const classes = useStyles()
	const methods = useForm()

	const { handleSubmit } = methods

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldContext.Provider
					value={{ initialValues, loading, onSubmit }}
				>
					<div className={classes.container}>{children}</div>
				</FieldContext.Provider>
			</form>
		</FormProvider>
	)
}

Form.Button = FormButton
Form.Input = FormInput

export default Form
