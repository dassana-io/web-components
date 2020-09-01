import 'antd/lib/switch/style/index.css'
import { Switch } from 'antd'
import React, { FC } from 'react'

export type ToggleSizeType = 'default' | 'small'

export interface ToggleProps {
	/**
	 * Required change handler.
	 */
	onChange: () => void
	/**
	 * Whether switch will be checked or "on" by default.
	 */
	defaultChecked?: boolean
	/**
	 * Whether switch will be disabled.
	 */
	disabled?: boolean
	/**
	 * The size of the toggle.
	 */
	size?: ToggleSizeType
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
