import 'antd/lib/button/style/index.css'
import 'antd/lib/spin/style/index.css'
import { ButtonProps as AntDButtonProps } from 'antd/es/button'
import classnames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons'
import Skeleton from '../Skeleton'
import { Button as AntDButton, Spin } from 'antd'
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
	 */
	disabled?: boolean
	/**
	 * Renders an animated loading icon next to the children.
	 */
	loading?: boolean
	/**
	 * Renders a skeleton for the button
	 */
	rendering?: boolean
	/**
	 * Array of classes to pass to button.
	 */
	classes?: string[]
}

const Button: FC<ButtonProps> = ({
	children,
	classes = [],
	disabled = false,
	loading = false,
	onClick,
	rendering = false,
	primary = false
}: ButtonProps) => {
	const antDProps: AntDButtonProps = {
		className: classnames(classes),
		disabled,
		onClick,
		type: primary ? 'primary' : 'default'
	}

	return rendering ? (
		<Skeleton height={32} width={75} />
	) : (
		<AntDButton {...antDProps}>
			{loading && (
				<span style={{ paddingRight: 8 }}>
					<Spin
						indicator={
							<LoadingOutlined spin style={{ fontSize: 16 }} />
						}
					/>
				</span>
			)}
			{children}
		</AntDButton>
	)
}

export default Button
