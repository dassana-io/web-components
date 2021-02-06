import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { ChangeEvent, FC, useContext } from 'react'
import { Timezone, TimezoneProps } from 'components/Timezone'

export interface FormTimezoneProps
	extends BaseFieldProps,
		Omit<TimezoneProps, 'onChange' | 'value'> {
	triggerSubmit?: boolean
}

const FormTimezone: FC<FormTimezoneProps> = ({
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	triggerSubmit = false,
	...rest
}: FormTimezoneProps) => {
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
					<Timezone
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

export default FormTimezone