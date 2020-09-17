import { createUseStyles } from 'react-jss'
import FieldContext from './FieldContext'
import { FieldValues } from 'react-hook-form/dist/types/form'
import FormInput from './FormInput'
import FormRadioGroup from './FormRadioGroup'
import FormSelect from './FormSelect'
import FormSubmitButton from './FormSubmitButton'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import React, { ReactNode, useEffect } from 'react'

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

	const { handleSubmit, reset } = methods

	useEffect(() => {
		reset(initialValues)
	}, [initialValues, reset])

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

Form.SubmitButton = FormSubmitButton
Form.Input = FormInput
Form.RadioGroup = FormRadioGroup
Form.Select = FormSelect

export * from './types'
export default Form
