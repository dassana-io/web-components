import { createUseStyles } from 'react-jss'
import FieldContext from './FieldContext'
import FormChipInput from './FormChipInput'
import FormInput from './FormInput'
import FormRadioGroup from './FormRadioGroup'
import FormSelect from './FormSelect'
import FormSubmitButton from './FormSubmitButton'
import FormTimeInput from './FormTimeInput'
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
	const methods = useForm({ defaultValues: initialValues, mode: 'onBlur' })
	const { reset } = methods

	const { handleSubmit } = methods

	useImperativeHandle(formRef, () => methods)

	useEffect(() => {
		/**
		 * Form must be reset with initialValues if they are fetched asynchronously because the
		 * initialValues are only passed into useForm once. Without the reset, defaultValues will
		 * always be an empty object.
		 */
		reset(initialValues)
	}, [initialValues, reset])

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

Form.SubmitButton = FormSubmitButton
Form.ChipInput = FormChipInput
Form.Input = FormInput
Form.RadioGroup = FormRadioGroup
Form.Select = FormSelect
Form.TimeInput = FormTimeInput
Form.Toggle = FormToggle
Form.Tree = FormTree

export type {
	FormStateProxy,
	UseFormMethods
} from 'react-hook-form/dist/types/form'
export * from './types'
