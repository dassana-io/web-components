import { type BaseFieldProps } from '../types'
import cn from 'classnames'
import { type InputRef } from 'antd'
import { ChipInput, type ChipInputProps } from 'components/ChipInput'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import { getFormFieldDataTag, renderFieldLabel } from '../utils'
import React, { type FC, useContext, useEffect, useRef } from 'react'

export interface FormChipInputProps
	extends BaseFieldProps,
		Omit<ChipInputProps, 'onChange' | 'onFocus' | 'values'> {
	focused?: boolean
}

const FormChipInput: FC<FormChipInputProps> = ({
	containerClasses = [],
	disabled = false,
	fieldErrorClasses = [],
	fieldLabelClasses = [],
	fullWidth = false,
	label,
	labelSkeletonWidth,
	focused,
	name,
	required,
	rules = {},
	...rest
}: FormChipInputProps) => {
	const inputRef = useRef<InputRef>(null)
	const {
		clearErrors,
		control,
		formState: { errors }
	} = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

	const errorMsg = errors[name] ? errors[name]?.message : ''

	const clearChipInputErrors = () => {
		if (errors[name]) clearErrors(name)
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
		<div className={cn(containerClasses)}>
			{renderFieldLabel({
				classes: fieldLabelClasses,
				fullWidth,
				label,
				loading,
				required,
				skeletonWidth: labelSkeletonWidth
			})}
			<Controller
				control={control}
				name={name}
				render={({ field: { onBlur, onChange, value } }) => (
					<ChipInput
						clearErrors={clearChipInputErrors}
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						error={!!errors[name]}
						errorMsg={errorMsg as string}
						fullWidth={fullWidth}
						inputRef={inputRef}
						loading={loading}
						onBlur={onBlur}
						onChange={onChange}
						onFocus={clearChipInputErrors}
						values={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormChipInput
