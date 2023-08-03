import { type BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Code, type CodeProps } from 'components/Code'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type FC, useContext } from 'react'

export interface FormCodeProps
	extends BaseFieldProps,
		Omit<CodeProps, 'code' | 'onChange'> {
	disabled?: boolean
}

const FormCode: FC<FormCodeProps> = ({
	disabled = false,
	fieldLabelClasses = [],
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormCodeProps) => {
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
					classes={fieldLabelClasses}
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
					<Code
						code={value}
						dataTag={getFormFieldDataTag(name)}
						loading={loading}
						onChange={value => {
							onChange(value)
						}}
						readOnly={formDisabled || disabled}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormCode
