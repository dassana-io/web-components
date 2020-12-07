import { Input as AntDInput } from 'antd'
import { BaseFieldProps } from '../types'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { Input, InputProps } from 'components/Input'
import React, { FC, KeyboardEvent, useContext, useEffect, useRef } from 'react'

export interface FormInputProps
	extends BaseFieldProps,
		Omit<InputProps, 'onChange' | 'onFocus' | 'value'> {
	focused?: boolean
}

const FormInput: FC<FormInputProps> = ({
	fullWidth = false,
	label,
	labelSkeletonWidth,
	focused,
	name,
	required,
	rules = {},
	...rest
}: FormInputProps) => {
	const inputRef = useRef<AntDInput>(null)
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

	useEffect(() => {
		if (focused && inputRef.current) {
			inputRef.current.focus()
		}
	}, [focused])

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
					<Input
						dataTag={getFormFieldDataTag(name)}
						error={errors[name]}
						fullWidth={fullWidth}
						inputRef={inputRef}
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

export default FormInput
