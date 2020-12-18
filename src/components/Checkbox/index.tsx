import '../assets/styles/antdAnimations.css'
import 'antd/lib/checkbox/style/index.css'
import { Checkbox as AntDCheckbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import { styleguide } from 'components/assets/styles'
import React, { FC, ReactNode } from 'react'
import { themedStyles, ThemeType } from '../assets/styles/themes'

const { dark, light } = ThemeType
const {
	colors: { blacks, grays, whites }
} = styleguide

const checkboxPalette = {
	[dark]: { primary: whites.base, secondary: blacks['lighten-30'] },
	[light]: { primary: blacks.base, secondary: grays.base }
}

const generateThemedCheckboxStyles = (themeType: ThemeType) => {
	const { primary, secondary } = checkboxPalette[themeType]
	const {
		base: { color }
	} = themedStyles[themeType]

	return {
		'&.ant-checkbox-wrapper': {
			'& .ant-checkbox ': {
				'&:hover .ant-checkbox-inner': {
					borderColor: primary
				}
			},
			'& .ant-checkbox-checked': {
				'&:after': { border: 'none' },
				'&:hover .ant-checkbox-inner, .ant-checkbox-inner': {
					'&::after': { borderColor: secondary },
					backgroundColor: primary,
					borderColor: primary
				}
			},
			'&:hover .ant-checkbox-inner': {
				borderColor: primary
			},
			color
		}
	}
}

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
