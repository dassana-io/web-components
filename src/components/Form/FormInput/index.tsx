import { Input as AntDInput } from 'antd'
import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { Input, InputProps } from 'components/Input'
import React, { FC, useContext, useEffect, useRef } from 'react'

export interface FormInputProps
	extends BaseFieldProps,
		Omit<InputProps, 'onChange' | 'value'> {
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
	const { control, errors } = useFormContext()
	const { initialValues, loading } = useContext<FieldContextProps>(
		FieldContext
	)

	useEffect(() => {
		if (focused && inputRef.current) {
			inputRef.current.focus()
		}
	}, [focused])

	if (required) {
		rules.required = true
	}

	const defaultValue = (initialValues[name] as string) || ''

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
				defaultValue={defaultValue}
				name={name}
				render={({ onChange, value }) => (
					<Input
						dataTag={getFormFieldDataTag(name)}
						error={errors[name]}
						fullWidth={fullWidth}
						inputRef={inputRef}
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
