import 'antd/lib/switch/style/index.css'
import { Switch } from 'antd'
import React, { FC } from 'react'

export interface ToggleProps {
	/**
	 * Required change handler
	 */
	onChange: () => void
	/**
	 * Determines whether the Switch is checked
	 */
	checked: boolean
	/**
	 * Whether switch will be checked or "on" by default
	 */
	defaultChecked?: boolean
	/**
	 * Whether switch will be disabled
	 */
	disabled?: boolean
	/**
	 * The size of the toggle
	 */
	size?: 'default' | 'small'
}

const Toggle: FC<ToggleProps> = ({
	checked,
	onChange,
	defaultChecked = false,
	disabled = false,
	size = 'default'
}: ToggleProps) => {
	const antDProps = {
		checked,
		defaultChecked,
		disabled,
		onChange,
		size
	}

	return <Switch {...antDProps} />
}

export default Toggle
