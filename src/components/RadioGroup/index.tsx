import 'antd/lib/radio/style/index.css'
import { Radio as AntDRadio } from 'antd'
import { CommonComponentProps } from '../types'

import RadioGroupSkeleton from './RadioGroupSkeleton'
import { getDataTestAttributeProp, TAG } from '../utils'
import React, { ChangeEventHandler, FC } from 'react'

export interface RadioGroupOptions {
	disabled?: boolean
	label: string
	value: string
}

export interface RadioGroupProps extends CommonComponentProps {
	/**
	 * Default value for radio group. Without this, the first option will be defaulted
	 */
	defaultValue?: string
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events)
	 * @default false
	 */
	disabled?: boolean
	/**
	 * Whether or not to show skeleton loader
	 * @default false
	 */
	loading?: boolean
	/**
	 * Callback that runs when element is updated
	 */
	onChange?: ChangeEventHandler
	/**
	 * Array of options to be rendered in the form of buttons
	 */
	options: RadioGroupOptions[]
	/**
	 * Element content value for controlled input elements. Requires an onChange to be passed
	 */
	value?: string
}

export const RadioGroup: FC<RadioGroupProps> = (props: RadioGroupProps) => {
	const {
		defaultValue,
		dataTag,
		disabled = false,
		loading = false,
		onChange,
		options,
		value
	} = props

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange,
			value
		}
	}

	return loading ? (
		<RadioGroupSkeleton count={options.length} />
	) : (
		<AntDRadio.Group
			buttonStyle='solid'
			defaultValue={defaultValue || options[0].value}
			disabled={disabled}
			name={getDataTestAttributeProp('radioGroup', dataTag)[TAG]}
			optionType='button'
			options={options}
			{...controlledCmpProps}
		/>
	)
}
