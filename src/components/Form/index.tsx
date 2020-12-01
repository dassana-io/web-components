import { createUseStyles } from 'react-jss'
import FieldContext from './FieldContext'
import FormInput from './FormInput'
import FormRadioGroup from './FormRadioGroup'
import FormSelect from './FormSelect'
import FormSubmitButton from './FormSubmitButton'
import FormToggle from './FormToggle'
import FormTree from './FormTree'
import { FieldValues, UseFormMethods } from 'react-hook-form/dist/types/form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import React, {
	ReactNode,
	RefObject,
	useEffect,
	useImperativeHandle
} from 'react'

const useStyles = createUseStyles({
	container: {
		'& >div:not(:last-child)': {
			paddingBottom: 15
		}
	}
})

export interface FormProps<Model> {
	children: ReactNode
	formRef?: RefObject<UseFormMethods>
	initialValues?: Model
	loading?: boolean
	onSubmit: SubmitHandler<FieldValues>
}

export function Form<Model>({
	children,
	formRef,
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

	useImperativeHandle(formRef, () => methods)

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
Form.Toggle = FormToggle
Form.Tree = FormTree

export type {
	FormStateProxy,
	UseFormMethods
} from 'react-hook-form/dist/types/form'
export * from './types'
