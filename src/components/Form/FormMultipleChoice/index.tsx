import { BaseFieldProps } from '../types'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import {
	getFormFieldDataTag,
	getRulesForArrVals,
	renderFieldLabel
} from '../utils'
import { MultipleChoice, MultipleChoiceProps } from 'components/MultipleChoice'
import React, { FC, useContext } from 'react'

export interface FormMultipleChoiceProps
	extends BaseFieldProps,
		Omit<MultipleChoiceProps, 'onChange' | 'value'> {}

const FormMultipleChoice: FC<FormMultipleChoiceProps> = ({
	label,
	labelSkeletonWidth,
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
			{renderFieldLabel({
				fullWidth: true,
				label,
				loading,
				required,
				skeletonWidth: labelSkeletonWidth
			})}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<MultipleChoice
						dataTag={getFormFieldDataTag(name)}
						loading={loading}
						onChange={onChange}
						value={value}
						{...rest}
					/>
				)}
				rules={getRulesForArrVals({ required, rules })}
			/>
		</div>
	)
}

export default FormMultipleChoice
