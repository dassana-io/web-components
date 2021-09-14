import 'antd/lib/radio/style/index.css'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateRadioGroupStyles } from './utils'
import RadioGroupSkeleton from './RadioGroupSkeleton'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { ThemeType } from '../assets/styles/themes'
import { Radio as AntDRadio, RadioChangeEvent } from 'antd'
import { getDataTestAttributeProp, TAG } from '../utils'
import React, { FC } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	radioGroup: generateRadioGroupStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $radioGroup': generateRadioGroupStyles(dark)
		}
	}
})

export interface RadioGroupOptions {
	disabled?: boolean
	label: string
	value: string
}

export type RadioChangeEventHandler = (e: RadioChangeEvent) => void

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
	onChange?: RadioChangeEventHandler
	/**
	 * Array of options to be rendered in the form of buttons
	 */
	options: RadioGroupOptions[]
	size?: SizeType
	/**
	 * Element content value for controlled input elements. Requires an onChange to be passed
	 */
	value?: string
}

export const RadioGroup: FC<RadioGroupProps> = ({
	defaultValue,
	dataTag,
	disabled = false,
	loading = false,
	onChange,
	options,
	value,
	...rest
}: RadioGroupProps) => {
	const classes = useStyles()

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
			{...rest}
			buttonStyle='solid'
			className={classes.radioGroup}
			defaultValue={defaultValue || options[0].value}
			disabled={disabled}
			name={getDataTestAttributeProp('radioGroup', dataTag)[TAG]}
			optionType='button'
			options={options}
			{...controlledCmpProps}
		/>
	)
}
