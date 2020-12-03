import { BaseFieldProps } from '../types'
import { createUseStyles } from 'react-jss'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { FC, useContext } from 'react'
import { Toggle, ToggleProps } from 'components/Toggle'

const { flexAlignCenter, font, spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		maxWidth: ({ fullWidth }) => (fullWidth ? '100%' : defaultFieldWidth),
		padding: `${spacing.m}px 0`
	},
	label: {
		...font.body,
		paddingBottom: 0,
		paddingRight: spacing.l,
		width: 'unset'
	}
})

export interface FormToggleProps
	extends Omit<BaseFieldProps, 'required'>,
		Omit<ToggleProps, 'onChange' | 'checked'> {
	label: string
	fullWidth?: boolean
}

const FormToggle: FC<FormToggleProps> = ({
	defaultChecked = false,
	fullWidth = false,
	label,
	labelSkeletonWidth,
	name,
	rules = {},
	...rest
}: FormToggleProps) => {
	const { control } = useFormContext()
	const { initialValues, loading } = useContext<FieldContextProps>(
		FieldContext
	)

	const classes = useStyles({ fullWidth })

	const defaultValue = (initialValues[name] as boolean) || defaultChecked

	// TODO: add info tips
	return (
		<div className={classes.container}>
			<FieldLabel
				classes={[classes.label]}
				label={label}
				loading={loading}
				required
				skeletonWidth={labelSkeletonWidth}
			/>
			<Controller
				control={control}
				defaultValue={defaultValue}
				name={name}
				render={({ onChange, value }) => (
					<Toggle
						checked={value}
						dataTag={getFormFieldDataTag(name)}
						defaultChecked={defaultChecked}
						onChange={(checked: boolean) => onChange(checked)}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormToggle
