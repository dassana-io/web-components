import { BaseFieldProps } from '../types'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import isEmpty from 'lodash/isEmpty'
import { Controller, get, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { ChangeEvent, FC, useContext } from 'react'
import { Select, SelectProps } from 'components/Select/SingleSelect'

export interface FormSelectProps
	extends BaseFieldProps,
		Omit<SelectProps, 'defaultValue' | 'onChange' | 'value'> {
	triggerSubmit?: boolean
}

const FormSelect: FC<FormSelectProps> = ({
	disabled = false,
	fieldErrorClasses = [],
	fullWidth = false,
	label,
	labelSkeletonWidth,
	loading = false,
	name,
	required,
	rules = {},
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

	rules.required = true

	const onSelectFocus = () => {
		if (errorMsg) clearErrors(name)
	}

	const triggerOnSubmit = (value: ChangeEvent) =>
		handleSubmit(onSubmit)(value)

	return (
		<div>
			{label && (
				<FieldLabel
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
							triggerSubmit && triggerOnSubmit(value)
						}}
						onFocus={onSelectFocus}
						value={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
			<FieldError
				classes={fieldErrorClasses}
				error={errorMsg}
				fullWidth={fullWidth}
			/>
		</div>
	)
}

export default FormSelect
