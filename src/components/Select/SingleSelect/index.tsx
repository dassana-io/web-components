import 'components/assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import cn from 'classnames'
import { NoContentFound } from 'components/Select/NoContentFound'
import { OptionChildren } from 'components/Select/OptionChildren'
import { SelectProps } from './types'
import { SelectSkeleton } from './SelectSkeleton'
import { useStyles } from '../utils'
import {
	generatePopupSelector,
	getDataTestAttributeProp
} from 'components/utils'
import React, { FC } from 'react'

const { Option } = AntDSelect

export const Select: FC<SelectProps> = (props: SelectProps) => {
	const {
		classes = [],
		dataTag,
		// defaulting defaultValue to empty string doesn't render a placeholder if a placeholder is provided
		defaultValue,
		disabled = false,
		error = false,
		loading = false,
		onChange,
		options,
		optionsConfig = {},
		popupContainerSelector,
		placeholder = '',
		showSearch = false,
		value
	} = props

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error,
			[componentClasses.dropdown]: true
		},
		classes
	)

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange,
			value
		}
	}

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				className={inputClasses}
				defaultValue={defaultValue}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				notFoundContent={<NoContentFound />}
				placeholder={placeholder}
				showSearch={showSearch}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('select', dataTag)}
				{...popupContainerProps}
			>
				{options.map(({ iconKey, text, value }) => (
					<Option
						className={componentClasses.option}
						key={value}
						label={text}
						value={value}
					>
						<OptionChildren
							iconKey={iconKey}
							key={value}
							optionsConfig={optionsConfig}
							text={text}
						/>
					</Option>
				))}
			</AntDSelect>
		</div>
	)
}

export * from './types'
