import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { ChangeEvent, FC, useContext } from 'react'
import { Select, SelectProps } from 'components/Select/SingleSelect'

export interface FormSelectProps
	extends BaseFieldProps,
		Omit<SelectProps, 'defaultValue' | 'onChange' | 'value'> {
	triggerSubmit?: boolean
}

const FormSelect: FC<FormSelectProps> = ({
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	triggerSubmit = false,
	...rest
}: FormSelectProps) => {
	const { control, handleSubmit } = useFormContext()
	const { loading, onSubmit } = useContext<FieldContextProps>(FieldContext)

	rules.required = true

	const triggerOnSubmit = (value: ChangeEvent) =>
		handleSubmit(onSubmit)(value)

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
						onChange={value => {
							onChange(value)
							triggerSubmit && triggerOnSubmit(value)
						}}
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
