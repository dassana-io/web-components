import 'antd/lib/switch/style/index.css'
import { Switch } from 'antd'
import React, { FC } from 'react'

export interface ToggleProps {
	/**
	 * Whether switch will be checked or "on" by default.
	 */
	defaultChecked?: boolean
	/**
	 * Whether switch will be disabled.
	 */
	disabled?: boolean
	/**
	 * Optional change handler.
	 */
	onChange?: () => void
	/**
	 * The size of the toggle.
	 */
	size?: 'default' | 'small'
}

const Toggle: FC<ToggleProps> = ({
	onChange,
	defaultChecked = false,
	disabled = false,
	size = 'default'
}: ToggleProps) => {
	const antDProps = {
		defaultChecked,
		disabled,
		onChange,
		size
	}

	return <Switch {...antDProps} />
}

export default Toggle
