import 'antd/lib/switch/style/index.css'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateToggleStyles } from './utils'
import { getDataTestAttributeProp } from '../utils'
import { Switch } from 'antd'
import { ThemeType } from '../assets/styles/themes'
import React, { FC } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		[`.${dark}`]: {
			'& $button': generateToggleStyles(dark)
		},
		button: generateToggleStyles(light)
	}
})

export interface ToggleProps extends CommonComponentProps {
	/**
	 * Required change handler
	 */
	onChange: (checked: boolean) => void
	/**
	 * Array of classes to pass to element
	 */
	classes?: string[]
	/**
	 * Determines whether the Switch is checked
	 */
	checked: boolean
	/**
	 * Whether switch will be disabled
	 */
	disabled?: boolean
	/**
	 * The size of the toggle
	 */
	size?: 'default' | 'small'
}

export const Toggle: FC<ToggleProps> = ({
	checked,
	classes = [],
	dataTag,
	disabled = false,
	onChange,
	size = 'default'
}: ToggleProps) => {
	useStyles()
	const toggleClasses = cn(classes)

	const antDProps = {
		checked,
		disabled,
		onChange,
		size
	}

	return (
		<Switch
			className={toggleClasses}
			{...antDProps}
			{...getDataTestAttributeProp('toggle', dataTag)}
		/>
	)
}
