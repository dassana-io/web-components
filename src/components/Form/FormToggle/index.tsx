import { type BaseFieldProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type FC, useContext } from 'react'
import { Toggle, type ToggleProps } from 'components/Toggle'

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
	containerClasses = [],
	defaultChecked = false,
	disabled = false,
	fieldLabelClasses = [],
	fullWidth = false,
	ignoreFormDisabled = false,
	label,
	labelSkeletonWidth,
	name,
	rules = {},
	...rest
}: FormToggleProps) => {
	const { control } = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

	const classes = useStyles({ fullWidth })

	// TODO: add info tips
	return (
		<div className={cn({ [classes.container]: true }, containerClasses)}>
			<FieldLabel
				classes={[cn({ [classes.label]: true }, fieldLabelClasses)]}
				label={label}
				loading={loading}
				required
				skeletonWidth={labelSkeletonWidth}
			/>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<Toggle
						checked={value}
						dataTag={getFormFieldDataTag(name)}
						defaultChecked={defaultChecked}
						disabled={
							(!ignoreFormDisabled && formDisabled) || disabled
						}
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
