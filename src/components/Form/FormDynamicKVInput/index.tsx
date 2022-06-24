import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import { DynamicKVInput, DynamicKVInputProps } from 'components/DynamicKVInput'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { FC, useContext } from 'react'

export interface FormDynamicKVInputProps
	extends BaseFieldProps,
		Omit<DynamicKVInputProps, 'onChange' | 'values'> {}

const FormDynamicKVInput: FC<FormDynamicKVInputProps> = ({
	disabled = false,
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormDynamicKVInputProps) => {
	const { control } = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

	if (required) {
		rules.required = true
	}

	return (
		<div>
			{label && (
				<FieldLabel
					label={label}
					loading={loading}
					required
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<DynamicKVInput
						dataTag={getFormFieldDataTag(name)}
						disabled={disabled || formDisabled}
						loading={loading}
						onChange={value => {
							onChange(value)
						}}
						values={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormDynamicKVInput
