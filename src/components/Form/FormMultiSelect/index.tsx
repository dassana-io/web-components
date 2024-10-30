import { type BaseFieldProps } from '../types'
import cn from 'classnames'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import { getFormFieldDataTag, getRulesForArrVals } from '../utils'
import {
	MultiSelect,
	type MultiSelectProps
} from 'components/Select/MultiSelect'
import React, { type FC, useContext } from 'react'

export interface FormMultiSelectProps
	extends BaseFieldProps,
		Omit<MultiSelectProps, 'defaultValues' | 'onChange' | 'values'> {}

const FormMultiSelect: FC<FormMultiSelectProps> = ({
	containerClasses = [],
	disabled = false,
	fieldErrorClasses = [],
	fieldLabelClasses = [],
	fullWidth = false,
	label,
	labelSkeletonWidth,
	loading,
	name,
	required,
	rules = {},
	...rest
}: FormMultiSelectProps) => {
	const {
		clearErrors,
		control,
		formState: { errors }
	} = useFormContext()
	const { disabled: formDisabled, loading: formLoading } =
		useContext<FieldContextProps>(FieldContext)

	const errorMsg = errors[name] ? errors[name]?.message : ''

	const onFocus = () => {
		if (errors[name]) clearErrors(name)
	}

	return (
		<div className={cn(containerClasses)}>
			{label && (
				<FieldLabel
					classes={fieldLabelClasses}
					fullWidth={fullWidth}
					label={label}
					loading={formLoading}
					required={required}
					skeletonWidth={labelSkeletonWidth}
				/>
			)}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<MultiSelect
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						error={!!errors[name]}
						fullWidth={fullWidth}
						loading={formLoading || loading}
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
				error={errorMsg as string}
				fullWidth={fullWidth}
			/>
		</div>
	)
}

export default FormMultiSelect
