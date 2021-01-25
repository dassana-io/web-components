import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { MultipleChoice, MultipleChoiceProps } from 'components/MultipleChoice'
import React, { FC, useContext } from 'react'

export interface FormMultipleChoiceProps
	extends BaseFieldProps,
		Omit<MultipleChoiceProps, 'onChange' | 'keys'> {
	label: string
}

const FormMultipleChoice: FC<FormMultipleChoiceProps> = ({
	label,
	labelSkeletonWidth,
	mode,
	name,
	required,
	rules = {},
	...rest
}: FormMultipleChoiceProps) => {
	const { control } = useFormContext()
	const { loading } = useContext<FieldContextProps>(FieldContext)

	if (required) {
		rules.required = true
	}

	return (
		<div>
			{label && (
				<FieldLabel
					fullWidth
					label={label}
					loading={loading}
					required={required}
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				name={name}
				render={({ onChange, value }) => {
					return mode === 'single' ? (
						<MultipleChoice
							dataTag={getFormFieldDataTag(name)}
							loading={loading}
							mode='single'
							onChange={(value: string) => {
								onChange(value)
							}}
							value={value as string}
							{...rest}
						/>
					) : (
						<MultipleChoice
							dataTag={getFormFieldDataTag(name)}
							loading={loading}
							onChange={(values: string[]) => {
								onChange(values)
							}}
							values={value as string[]}
							{...rest}
						/>
					)
				}}
				rules={rules}
			/>
		</div>
	)
}

export default FormMultipleChoice
