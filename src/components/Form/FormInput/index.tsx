import FieldContext from '../FieldContext'
import FieldLabel from '../FieldLabel'
import { Controller, useFormContext, ValidationRules } from 'react-hook-form'
import Input, { InputProps } from '../../Input'
import React, { FC, useContext } from 'react'

interface BaseFieldProps {
	label?: string
	name: string
	required?: boolean
	rules?: ValidationRules
}

export interface FormInputProps extends BaseFieldProps, InputProps {}

const FormInput: FC<FormInputProps> = ({
	label,
	name,
	required,
	rules = {},
	...rest
}: FormInputProps) => {
	const { control, errors } = useFormContext()
	const { loading } = useContext(FieldContext)

	if (required) {
		rules.required = true
	}

	return (
		<div>
			{label && (
				<FieldLabel
					label={label}
					loading={loading}
					required={required}
				/>
			)}
			<Controller
				control={control}
				defaultValue=''
				name={name}
				render={({ onChange, value }) => (
					<Input
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
