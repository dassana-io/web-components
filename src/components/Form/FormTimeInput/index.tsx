import { BaseFieldProps } from '../types'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { FC, KeyboardEvent, useContext } from 'react'
import { TimeInput, TimeInputProps } from 'components/Input'

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

	const errorMsg = errors[name] ? errors[name].message : ''

	const onInputFocus = () => {
		if (errors[name]) clearErrors(name)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		// This prevents the form from being automatically submitted when the Enter button is pressed
		if (e.key === 'Enter') e.preventDefault()
	}

	if (required) {
		rules.required = true
	}

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
						onFocus={onInputFocus}
						onKeyDown={onKeyDown}
						value={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
			<FieldError error={errorMsg} fullWidth={fullWidth} />
		</div>
	)
}

export default FormTimeInput
