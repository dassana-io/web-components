import 'antd/lib/radio/style/index.css'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateRadioButtonGroupStyles } from './utils'
import RadioButtonGroupSkeleton from './RadioButtonGroupSkeleton'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { ThemeType } from '../assets/styles/themes'
import { Radio as AntDRadio, RadioChangeEvent } from 'antd'
import { getDataTestAttributeProp, TAG } from '../utils'
import React, { FC, ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	radioGroup: generateRadioButtonGroupStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $radioGroup': generateRadioButtonGroupStyles(dark)
		}
	}
})

export interface RadioButtonGroupOptions {
	disabled?: boolean
	label: ReactNode
	value: string
}

export type RadioChangeEventHandler = (e: RadioChangeEvent) => void

export interface RadioButtonGroupProps extends CommonComponentProps {
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
	options: RadioButtonGroupOptions[]
	size?: SizeType
	/**
	 * Element content value for controlled input elements. Requires an onChange to be passed
	 */
	value?: string
}

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
	defaultValue,
	dataTag,
	disabled = false,
	loading = false,
	onChange,
	options,
	value,
	...rest
}: RadioButtonGroupProps) => {
	const classes = useStyles()

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange,
			value
		}
	}

	return loading ? (
		<RadioButtonGroupSkeleton count={options.length} />
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
