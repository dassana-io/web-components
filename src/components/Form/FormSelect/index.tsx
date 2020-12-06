import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { FC, useContext } from 'react'
import { Select, SelectProps } from 'components/Select'

export interface FormSelectProps
	extends BaseFieldProps,
		Omit<SelectProps, 'defaultValue' | 'onChange' | 'value'> {}

const FormSelect: FC<FormSelectProps> = ({
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormSelectProps) => {
	const { control } = useFormContext()
	const { loading } = useContext<FieldContextProps>(FieldContext)

	rules.required = true

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
				render={({ onChange, value }) => (
					<Select
						dataTag={getFormFieldDataTag(name)}
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

export default FormSelect
