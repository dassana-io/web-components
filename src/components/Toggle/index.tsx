import 'antd/lib/switch/style/index.css'
import { Switch } from 'antd'
import React, { FC } from 'react'

export interface ToggleProps {
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

const Toggle: FC<ToggleProps> = ({
	checked,
	onChange,
	disabled = false,
	size = 'default'
}: ToggleProps) => {
	const antDProps = {
		checked,
		disabled,
		onChange,
		size
	}

	return <Switch {...antDProps} />
}

export default Toggle
