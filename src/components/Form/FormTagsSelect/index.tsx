import { BaseFieldProps } from '../types'
import cn from 'classnames'
import FieldError from '../FieldError'
import FieldLabel from '../FieldLabel'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import { getFormFieldDataTag, getRulesForArrVals } from '../utils'
import React, { FC, useContext } from 'react'
import { TagsSelect, TagsSelectProps } from 'components/Select/TagsSelect'

export interface FormTagsSelectProps
	extends BaseFieldProps,
		Omit<TagsSelectProps, 'defaultValues' | 'onChange' | 'values'> {}

const FormTagsSelect: FC<FormTagsSelectProps> = ({
	containerClasses = [],
	disabled = false,
	fieldErrorClasses = [],
	fullWidth = false,
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormTagsSelectProps) => {
	const {
		clearErrors,
		control,
		formState: { errors }
	} = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

	const errorMsg = errors[name] ? errors[name]?.message : ''

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
				render={({ field: { onChange, value } }) => (
					<TagsSelect
						dataTag={getFormFieldDataTag(name)}
						disabled={formDisabled || disabled}
						error={!!errors[name]}
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
				error={errorMsg as string}
				fullWidth={fullWidth}
			/>
		</div>
	)
}

export default FormTagsSelect
