import 'antd/lib/switch/style/index.css'
import { CommonComponentProps } from '../types'
import { getDataTestAttributeProp } from '../utils'
import { Switch } from 'antd'
import React, { FC } from 'react'

export interface ToggleProps extends CommonComponentProps {
	/**
	 * Required change handler
	 */
	onChange: (checked: boolean) => void
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
	dataTag,
	disabled = false,
	onChange,
	size = 'default'
}: ToggleProps) => {
	const antDProps = {
		checked,
		disabled,
		onChange,
		size
	}

	return (
		<Switch
			{...antDProps}
			{...getDataTestAttributeProp('toggle', dataTag)}
		/>
	)
}
