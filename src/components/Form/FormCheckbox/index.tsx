import { type BaseFieldProps } from '../types'
import { type CheckboxChangeEvent } from 'antd/es/checkbox'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Checkbox, type CheckboxProps } from 'components/Checkbox'
import { Controller, useFormContext } from 'react-hook-form'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type FC, useContext } from 'react'

const { flexAlignCenter, font, spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		maxWidth: ({ fullWidth }) => (fullWidth ? '100%' : defaultFieldWidth),
		padding: `${spacing.m}px 0`
	},
	label: {
		...font.body,
		padding: {
			bottom: 0,
			left: spacing.m
		},
		width: 'unset'
	}
})

export interface FormCheckboxProps
	extends Omit<BaseFieldProps, 'required'>,
		Omit<CheckboxProps, 'onChange' | 'checked'> {
	label: string
	fullWidth?: boolean
}

const FormCheckbox: FC<FormCheckboxProps> = ({
	containerClasses = [],
	defaultChecked = false,
	disabled = false,
	fullWidth = false,
	label,
	labelSkeletonWidth,
	name,
	rules = {},
	...rest
}: FormCheckboxProps) => {
	const { control } = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

	const classes = useStyles({ fullWidth })

	const checkboxContainerClasses = cn(
		{
			[classes.container]: true
		},
		containerClasses
	)

	return (
		<div className={checkboxContainerClasses}>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<Checkbox
						checked={value}
						dataTag={getFormFieldDataTag(name)}
						defaultChecked={defaultChecked}
						disabled={formDisabled || disabled}
						onChange={(e: CheckboxChangeEvent) =>
							onChange(e.target.checked)
						}
						{...rest}
					/>
				)}
				rules={rules}
			/>
			<FieldLabel
				classes={[classes.label]}
				label={label}
				loading={loading}
				required
				skeletonWidth={labelSkeletonWidth}
			/>
		</div>
	)
}

export default FormCheckbox
