import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { RadioGroup, RadioGroupProps } from 'components/RadioGroup'
import React, { FC, useContext } from 'react'

export interface FormRadioGroupProps
	extends BaseFieldProps,
		Omit<RadioGroupProps, 'onChange' | 'value'> {}

const FormRadioGroup: FC<FormRadioGroupProps> = ({
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormRadioGroupProps) => {
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
					<RadioGroup
						dataTag={getFormFieldDataTag(name)}
						loading={loading}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => onChange(event.target.value)}
						value={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormRadioGroup
