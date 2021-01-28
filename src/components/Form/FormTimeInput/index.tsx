import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { FC, useContext } from 'react'
import { TimeInput, TimeInputProps } from 'components/TimeInput'

export interface FormTimeInputProps
	extends BaseFieldProps,
		Omit<TimeInputProps, 'defaultValue' | 'onChange' | 'value'> {
	focused?: boolean
}

const FormTimeInput: FC<FormTimeInputProps> = ({
	fullWidth = false,
	label,
	labelSkeletonWidth,
	focused,
	name,
	required,
	rules = {},
	...rest
}: FormTimeInputProps) => {
	const { clearErrors, control, errors } = useFormContext()
	const { loading } = useContext<FieldContextProps>(FieldContext)

	const onFocus = () => {
		if (errors[name]) clearErrors(name)
	}

	if (required) rules.required = true

	return (
		<div>
			{label && (
				<FieldLabel
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
				render={({ onChange, value }) => (
					<TimeInput
						dataTag={getFormFieldDataTag(name)}
						error={errors[name]}
						fullWidth={fullWidth}
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

export default FormTimeInput
