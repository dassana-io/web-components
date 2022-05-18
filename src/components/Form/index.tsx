import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import FieldContext from './FieldContext'
import FieldLabel from './FieldLabel'
import FormCheckbox from './FormCheckbox'
import FormChipInput from './FormChipInput'
import FormCode from './FormCode'
import FormInput from './FormInput'
import FormMultipleChoice from './FormMultipleChoice'
import FormMultiSelect from './FormMultiSelect'
import FormRadioButtonGroup from './FormRadioButtonGroup'
import FormSelect from './FormSelect'
import FormSubmitButton from './FormSubmitButton'
import FormTimeInput from './FormTimeInput'
import FormTimezone from './FormTimezone'
import FormToggle from './FormToggle'
import FormTree from './FormTree'
import {
	DeepPartial,
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
	useFormContext
} from 'react-hook-form'
import React, {
	ReactNode,
	RefObject,
	useEffect,
	useImperativeHandle
} from 'react'
import {
	UnpackNestedValue,
	UseFormReturn
} from 'react-hook-form/dist/types/form'

const useStyles = createUseStyles({
	container: {
		'& >div:not(:last-child)': {
			paddingBottom: 15
		}
	}
})

export interface FormProps<Model extends FieldValues> {
	children: ReactNode
	disabled?: boolean
	formContainerClasses?: string[]
	formRef?: RefObject<UseFormReturn<Model>>
	initialValues?: UnpackNestedValue<DeepPartial<Model>>
	loading?: boolean
	onKeyDown?: (event: any) => void
	onSubmit: SubmitHandler<FieldValues>
}

export function Form<Model>({
	children,
	disabled = false,
	formContainerClasses = [],
	formRef,
	initialValues = {} as UnpackNestedValue<DeepPartial<Model>>,
	loading = false,
	onKeyDown,
	onSubmit
}: FormProps<Model>) {
	const classes = useStyles()
	const methods = useForm({
		defaultValues: initialValues,
		mode: 'onBlur'
	})
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
			<form
				onKeyDown={onKeyDown ? e => onKeyDown(e) : undefined}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FieldContext.Provider value={{ disabled, loading, onSubmit }}>
					<div
						className={cn(
							{ [classes.container]: true },
							formContainerClasses
						)}
					>
						{children}
					</div>
				</FieldContext.Provider>
			</form>
		</FormProvider>
	)
}

Form.SubmitButton = FormSubmitButton
Form.Checkbox = FormCheckbox
Form.ChipInput = FormChipInput
Form.Code = FormCode
Form.Input = FormInput
Form.MultipleChoice = FormMultipleChoice
Form.MultiSelect = FormMultiSelect
Form.RadioButtonGroup = FormRadioButtonGroup
Form.Select = FormSelect
Form.TimeInput = FormTimeInput
Form.Timezone = FormTimezone
Form.Toggle = FormToggle
Form.Tree = FormTree

export { FieldLabel, useFormContext }
export type {
	FormStateProxy,
	UseFormReturn
} from 'react-hook-form/dist/types/form'
export * from './types'
