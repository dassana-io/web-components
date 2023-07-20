import { type BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type ChangeEvent, type FC, useContext } from 'react'
import { Timezone, type TimezoneProps } from 'components/Timezone'

export interface FormTimezoneProps
	extends BaseFieldProps,
		Omit<TimezoneProps, 'onChange' | 'value'> {
	triggerSubmit?: boolean
}

const FormTimezone: FC<FormTimezoneProps> = ({
	disabled = false,
	label,
	labelSkeletonWidth,
	name,
	options,
	required,
	rules = {},
	triggerSubmit = false,
	...rest
}: FormTimezoneProps) => {
	const { control, handleSubmit } = useFormContext()
	const {
		disabled: formDisabled,
		loading,
		onSubmit
	} = useContext<FieldContextProps>(FieldContext)

	rules.required = true

	const triggerOnSubmit = async (value: ChangeEvent) =>
		await handleSubmit(onSubmit)(value)

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
					<Timezone
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						loading={loading}
						onChange={value => {
							onChange(value)
							triggerSubmit &&
								triggerOnSubmit(value as unknown as ChangeEvent)
						}}
						options={options}
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
