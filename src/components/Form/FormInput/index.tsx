import { type BaseFieldProps } from '../types'
import cn from 'classnames'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { getJSONPathValue } from 'components/JSONPathPicker'
import {
	Controller,
	type FieldError as FieldErrorType,
	useFormContext
} from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import { Input, type InputProps } from 'components/Input'
import React, {
	type FC,
	type KeyboardEvent,
	type ReactNode,
	useContext
} from 'react'

export interface FormInputProps
	extends BaseFieldProps,
		Omit<InputProps, 'onChange' | 'onFocus' | 'value'> {
	fieldErrorIcon?: ReactNode
	focused?: boolean
}

const FormInput: FC<FormInputProps> = ({
	containerClasses = [],
	disabled = false,
	fieldErrorClasses = [],
	fieldErrorIcon,
	fieldLabelClasses = [],
	focused,
	fullWidth = false,
	label,
	labelSkeletonWidth,
	loading,
	name,
	required,
	rules = {},
	showError = true,
	...rest
}: FormInputProps) => {
	const {
		clearErrors,
		control,
		formState: { errors }
	} = useFormContext()

	const { disabled: formDisabled, loading: formLoading } =
		useContext<FieldContextProps>(FieldContext)

	const errorObj = getJSONPathValue<FieldErrorType>(
		`$.${name}`,
		errors as any
	) as FieldErrorType

	const errorMsg = (errorObj && errorObj.message) ?? ''

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
		<div className={cn(containerClasses)}>
			{label && (
				<FieldLabel
					classes={fieldLabelClasses}
					fullWidth={fullWidth}
					label={label}
					loading={formLoading || loading}
					required={required}
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						// error={errors[name]}
						error={!!errorObj}
						focused={focused}
						fullWidth={fullWidth}
						loading={formLoading || loading}
						onBlur={onBlur}
						onChange={onChange}
						onFocus={onInputFocus}
						onKeyDown={onKeyDown}
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
					errorIcon={fieldErrorIcon}
					fullWidth={fullWidth}
				/>
			)}
		</div>
	)
}

export default FormInput
