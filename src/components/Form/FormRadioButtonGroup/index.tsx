import { type BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import {
	RadioButtonGroup,
	type RadioButtonGroupProps
} from 'components/RadioButtonGroup'
import React, { type FC, useContext } from 'react'

export interface FormRadioButtonGroupProps
	extends BaseFieldProps,
		Omit<RadioButtonGroupProps, 'onChange' | 'value'> {}

const FormRadioButtonGroup: FC<FormRadioButtonGroupProps> = ({
	disabled = false,
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormRadioButtonGroupProps) => {
	const { control } = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

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
				render={({ field: { onChange, value } }) => (
					<RadioButtonGroup
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						loading={loading}
						onChange={event => onChange(event.target.value)}
						value={value}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormRadioButtonGroup
