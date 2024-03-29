import { type BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type FC, useContext } from 'react'
import { TimeInput, type TimeInputProps } from 'components/TimeInput'

export interface FormTimeInputProps
	extends BaseFieldProps,
		Omit<TimeInputProps, 'defaultValue' | 'onChange' | 'value'> {
	focused?: boolean
	fullWidth?: boolean
}

const FormTimeInput: FC<FormTimeInputProps> = ({
	disabled = false,
	fieldLabelClasses = [],
	label,
	labelSkeletonWidth,
	fullWidth,
	name,
	required,
	rules = {},
	...rest
}: FormTimeInputProps) => {
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
					<TimeInput
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

export default FormTimeInput
