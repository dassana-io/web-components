import { Input as AntDInput } from 'antd'
import { BaseFieldProps } from '../types'
import cn from 'classnames'
import { ChipInput, ChipInputProps } from 'components/ChipInput'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { getFormFieldDataTag, renderFieldLabel } from '../utils'
import React, { FC, useContext, useEffect, useRef } from 'react'

export interface FormChipInputProps
	extends BaseFieldProps,
		Omit<ChipInputProps, 'onChange' | 'onFocus' | 'values'> {
	focused?: boolean
}

const FormChipInput: FC<FormChipInputProps> = ({
	containerClasses = [],
	fieldErrorClasses = [],
	fullWidth = false,
	label,
	labelSkeletonWidth,
	focused,
	name,
	required,
	rules = {},
	...rest
}: FormChipInputProps) => {
	const inputRef = useRef<AntDInput>(null)
	const { clearErrors, control, errors } = useFormContext()
	const { loading } = useContext<FieldContextProps>(FieldContext)

	const errorMsg = errors[name] ? errors[name].message : ''

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
				fullWidth,
				label,
				loading,
				required,
				skeletonWidth: labelSkeletonWidth
			})}
			<Controller
				control={control}
				name={name}
				render={({ onChange, value }) => (
					<ChipInput
						clearErrors={clearChipInputErrors}
						dataTag={getFormFieldDataTag(name)}
						error={errors[name]}
						errorMsg={errorMsg}
						fullWidth={fullWidth}
						inputRef={inputRef}
						loading={loading}
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
