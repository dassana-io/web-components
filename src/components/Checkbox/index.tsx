import '../assets/styles/antdAnimations.css'
import 'antd/lib/checkbox/style/index.css'
import { Checkbox as AntDCheckbox } from 'antd'
import { type CheckboxChangeEvent } from 'antd/es/checkbox'
import cn from 'classnames'
import { type CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateThemedCheckboxStyles } from './utils'
import { getDataTestAttributeProp } from '../utils'
import { ThemeType } from '../assets/styles/themes'
import React, { type FC, type ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		label: generateThemedCheckboxStyles(light),
		[`.${dark}`]: {
			'& $label': generateThemedCheckboxStyles(dark)
		}
	}
})

export interface CheckboxProps extends CommonComponentProps {
	/**
	 * Determines whether the Checkbox is checked
	 */
	checked?: boolean
	/**
	 * Array of classes to pass to element
	 * @default []
	 */
	classes?: string[]
	/**
	 * Determines whether the Checkbox is checked by default
	 */
	defaultChecked?: boolean
	/**
	 * Whether Checkbox will be disabled
	 */
	disabled?: boolean
	/**
	 * Label to render on the right of checkbox
	 */
	label?: ReactNode
	/**
	 * Callback that runs when Checkbox is updated
	 */
	onChange?: (e: CheckboxChangeEvent) => void
}

export const Checkbox: FC<CheckboxProps> = ({
	checked,
	classes = [],
	dataTag,
	defaultChecked,
	disabled = false,
	label,
	onChange
}: CheckboxProps) => {
	useStyles()

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			checked,
			onChange
		}
	}

	if (checked && !onChange) {
		throw new Error('Controlled checkboxes require an onChange prop')
	}

	return (
		<AntDCheckbox
			className={cn(classes)}
			defaultChecked={defaultChecked}
			disabled={disabled}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('checkbox', dataTag)}
		>
			{label}
		</AntDCheckbox>
	)
}

export type { CheckboxChangeEvent }
