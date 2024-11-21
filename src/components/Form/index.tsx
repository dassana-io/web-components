import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import FieldContext from './FieldContext'
import FieldLabel from './FieldLabel'
import FormCheckbox from './FormCheckbox'
import FormChipInput from './FormChipInput'
import FormCode from './FormCode'
import FormDateInput from './FormDateInput'
import FormDynamicKVInput from './FormDynamicKVInput'
import FormInput from './FormInput'
import FormMultipleChoice from './FormMultipleChoice'
import FormMultiSelect from './FormMultiSelect'
import FormRadioButtonGroup from './FormRadioButtonGroup'
import FormSelect from './FormSelect'
import FormSubmitButton from './FormSubmitButton'
import FormTagsSelect from './FormTagsSelect'
import FormTimeInput from './FormTimeInput'
import FormTimezone from './FormTimezone'
import FormToggle from './FormToggle'
import FormTree from './FormTree'
import { getNonEmptyKVInputPairs } from './utils'
import isEmpty from 'lodash/isEmpty'
import {
	type DefaultValues,
	type Mode,
	type UseFormReturn
} from 'react-hook-form/dist/types/form'
import {
	type FieldValues,
	FormProvider,
	type SubmitHandler,
	useForm,
	useFormContext
} from 'react-hook-form'
import React, {
	type ReactNode,
	type RefObject,
	useEffect,
	useImperativeHandle,
	useState
} from 'react'

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
	initialValues?: Model
	mode?: Mode
	loading?: boolean
	onSubmit: SubmitHandler<FieldValues>
}

export function Form<Model extends FieldValues>({
	children,
	disabled = false,
	formContainerClasses = [],
	formRef,
	initialValues = {} as Model,
	loading = false,
	mode = 'onBlur',
	onSubmit
}: FormProps<Model>) {
	const classes = useStyles()
	const methods = useForm<Model>({
		defaultValues: initialValues as DefaultValues<Model>,
		mode
	})
	const { reset } = methods

	const { handleSubmit } = methods

	const [initialized, setInitialized] = useState(false)

	useImperativeHandle(formRef, () => methods)

	useEffect(() => {
		/**
		 * Form must be reset with initialValues if they are fetched asynchronously because the
		 * initialValues are only passed into useForm once. Without the reset, defaultValues will
		 * always be an empty object.
		 */
		if (!isEmpty(initialValues) && !initialized) {
			reset(initialValues)

			setInitialized(true)
		}
	}, [initialValues, initialized, reset])

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
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
Form.DateInput = FormDateInput
Form.DynamicKVInput = FormDynamicKVInput
Form.Input = FormInput
Form.MultipleChoice = FormMultipleChoice
Form.MultiSelect = FormMultiSelect
Form.RadioButtonGroup = FormRadioButtonGroup
Form.Select = FormSelect
Form.TagsSelect = FormTagsSelect
Form.TimeInput = FormTimeInput
Form.Timezone = FormTimezone
Form.Toggle = FormToggle
Form.Tree = FormTree

export { FieldLabel, getNonEmptyKVInputPairs, useFormContext }
export type {
	FormStateProxy,
	UseFormReturn
} from 'react-hook-form/dist/types/form'
export * from './types'
