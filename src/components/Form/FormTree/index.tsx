import { BaseFieldProps } from '../types'
import FieldLabel from '../FieldLabel'
import { getFormFieldDataTag } from '../utils'
import { Controller, useFormContext } from 'react-hook-form'
import FieldContext, { FieldContextProps } from '../FieldContext'
import React, { FC, useContext } from 'react'
import Tree, { TreeId, TreeProps } from '../../Tree'

export interface FormTreeProps
	extends BaseFieldProps,
		Omit<TreeProps, 'onChange'> {}

const FormTree: FC<FormTreeProps> = ({
	defaultChecked,
	label,
	labelSkeletonWidth,
	name,
	required,
	rules = {},
	...rest
}: FormTreeProps) => {
	const { control } = useFormContext()
	const { initialValues, loading } = useContext<FieldContextProps>(
		FieldContext
	)
	const defaultValue =
		(initialValues[name] as TreeId[]) || defaultChecked || []

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
				defaultValue={defaultValue}
				name={name}
				render={({ onChange }) => (
					<Tree
						dataTag={getFormFieldDataTag(name)}
						defaultChecked={defaultValue}
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
