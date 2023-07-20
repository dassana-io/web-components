import { type BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { type FieldContextProps } from '../FieldContext'
import React, { type FC, useContext } from 'react'
import { Tree, type TreeProps } from 'components/Tree'

export interface FormTreeProps
	extends BaseFieldProps,
		Omit<TreeProps, 'onChange'> {}

const FormTree: FC<FormTreeProps> = ({
	defaultChecked,
	disabled = false,
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormTreeProps) => {
	const { control } = useFormContext()
	const { disabled: formDisabled, loading } =
		useContext<FieldContextProps>(FieldContext)

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
					<Tree
						dataTag={getFormFieldDataTag(name)}
						defaultChecked={value}
						disabled={formDisabled || disabled}
						loading={loading}
						onChange={onChange}
						{...rest}
					/>
				)}
				rules={rules}
			/>
		</div>
	)
}

export default FormTree
