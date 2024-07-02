import { type BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import { DateInput, type DateInputProps } from 'components/DateInput'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type FC, useContext } from 'react'

export interface FormDateInputProps
	extends BaseFieldProps,
		Omit<DateInputProps, 'defaultValue' | 'onChange' | 'value'> {
	focused?: boolean
	fullWidth?: boolean
}

const FormDateInput: FC<FormDateInputProps> = ({
	disabled = false,
	fieldLabelClasses = [],
	label,
	labelSkeletonWidth,
	fullWidth,
	name,
	required,
	rules = {},
	...rest
}: FormDateInputProps) => {
	const {
		clearErrors,
		control,
		formState: { errors }
	} = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

	const onFocus = () => {
		if (errors[name]) clearErrors(name)
	}

	if (required) rules.required = true

	return (
		<div>
			{label && (
				<FieldLabel
					classes={fieldLabelClasses}
					fullWidth={fullWidth}
					label={label}
					loading={loading}
					required={required}
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<DateInput
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						error={!!errors[name]}
						loading={loading}
						onChange={onChange}
						onFocus={onFocus}
						value={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormDateInput
