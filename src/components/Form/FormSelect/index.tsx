import { type BaseFieldProps } from '../types'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import isEmpty from 'lodash/isEmpty'
import { Controller, get, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type ChangeEvent, type FC, useContext } from 'react'
import { Select, type SelectProps } from 'components/Select/SingleSelect'

export interface FormSelectProps
	extends BaseFieldProps,
		Omit<SelectProps, 'defaultValue' | 'onChange' | 'value'> {
	triggerSubmit?: boolean
}

const FormSelect: FC<FormSelectProps> = ({
	disabled = false,
	fieldErrorClasses = [],
	fieldLabelClasses = [],
	fullWidth = false,
	label,
	labelSkeletonWidth,
	loading = false,
	name,
	required,
	rules = {},
	showError = true,
	triggerSubmit = false,
	...rest
}: FormSelectProps) => {
	const {
		clearErrors,
		control,
		formState: { errors },
		handleSubmit
	} = useFormContext()
	const {
		disabled: formDisabled,
		loading: formLoading,
		onSubmit
	} = useContext<FieldContextProps>(FieldContext)

	const fieldErrors = get(errors, name)
	const errorMsg = !isEmpty(fieldErrors) ? fieldErrors.message : ''

	if (required) {
		rules.required = true
	}

	const onSelectFocus = () => {
		if (errorMsg) clearErrors(name)
	}

	const triggerOnSubmit = async (value: ChangeEvent) =>
		await handleSubmit(onSubmit)(value)

	return (
		<div>
			{label && (
				<FieldLabel
					classes={fieldLabelClasses}
					label={label}
					loading={formLoading || loading}
					required
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<Select
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						error={errorMsg}
						fullWidth={fullWidth}
						loading={formLoading || loading}
						onChange={value => {
							onChange(value)
							triggerOnSubmit?.(value)
						}}
						onFocus={onSelectFocus}
						value={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
			{showError && (
				<FieldError
					classes={fieldErrorClasses}
					error={errorMsg}
					fullWidth={fullWidth}
				/>
			)}
		</div>
	)
}

export default FormSelect
