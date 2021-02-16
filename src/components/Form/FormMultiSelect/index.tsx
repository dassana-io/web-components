import { BaseFieldProps } from '../types'
import cn from 'classnames'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { getFormFieldDataTag, getRulesForArrVals } from '../utils'
import { MultiSelect, MultiSelectProps } from 'components/Select/MultiSelect'
import React, { FC, useContext } from 'react'

export interface FormMultiSelectProps
	extends BaseFieldProps,
		Omit<MultiSelectProps, 'defaultValues' | 'onChange' | 'values'> {}

const FormMultiSelect: FC<FormMultiSelectProps> = ({
	containerClasses = [],
	fieldErrorClasses = [],
	fullWidth = false,
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormMultiSelectProps) => {
	const { clearErrors, control, errors } = useFormContext()
	const { loading } = useContext<FieldContextProps>(FieldContext)

	const errorMsg = errors[name] ? errors[name].message : ''

	const onFocus = () => {
		if (errors[name]) clearErrors(name)
	}

	return (
		<div className={cn(containerClasses)}>
			{label && (
				<FieldLabel
					fullWidth={fullWidth}
					label={label}
					loading={loading}
					required={required}
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				name={name}
				render={({ onChange, value }) => (
					<MultiSelect
						dataTag={getFormFieldDataTag(name)}
						error={errors[name]}
						fullWidth={fullWidth}
						loading={loading}
						onChange={onChange}
						onFocus={onFocus}
						values={value}
						{...rest}
					/>
				)}
				rules={getRulesForArrVals({ required, rules })}
			/>
			<FieldError
				classes={fieldErrorClasses}
				error={errorMsg}
				fullWidth={fullWidth}
			/>
		</div>
	)
}

export default FormMultiSelect
