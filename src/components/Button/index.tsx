import 'antd/lib/button/style/index.css'
import { Button as AntDButton } from 'antd'
import { ButtonProps as AntDButtonProps } from 'antd/es/button'
import classnames from 'classnames'
import React, { FC, ReactNode } from 'react'

export interface ButtonProps {
	/**
	 * Required click handler.
	 */
	onClick: () => void
	/**
	 * Button children to render including button text.
	 */
	children: ReactNode
	/**
	 * Whether button is of primary type. **Note**: Setting primary to true will override background color set by classes.
	 */
	primary?: boolean
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events).
	 * */
	disabled?: boolean
	/**
	 * Array of classes to pass to button.
	 */
	classes?: string[]
}

const Button: FC<ButtonProps> = ({
	children,
	onClick,
	primary = false,
	disabled = false,
	classes = []
}: ButtonProps) => {
	const antDProps: AntDButtonProps = {
		className: classnames(classes),
		disabled,
		onClick,
		type: primary ? 'primary' : 'default'
	}

	return <AntDButton {...antDProps}>{children}</AntDButton>
}

export default Button
