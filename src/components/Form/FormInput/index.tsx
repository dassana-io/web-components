import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { Input, InputProps } from '../../Input'
import React, { FC, useContext } from 'react'

export interface FormInputProps
	extends BaseFieldProps,
		Omit<InputProps, 'onChange' | 'value'> {}

const FormInput: FC<FormInputProps> = ({
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormInputProps) => {
	const { control, errors } = useFormContext()
	const { initialValues, loading } = useContext<FieldContextProps>(
		FieldContext
	)

	if (required) {
		rules.required = true
	}

	const defaultValue = (initialValues[name] as string) || ''

	return (
		<div>
			{label && (
				<FieldLabel
					label={label}
					loading={loading}
					required={required}
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				defaultValue={defaultValue}
				name={name}
				render={({ onChange, value }) => (
					<Input
						dataTag={getFormFieldDataTag(name)}
						error={errors[name]}
						loading={loading}
						onChange={onChange}
						value={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormInput
