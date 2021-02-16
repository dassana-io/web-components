import 'antd/lib/button/style/index.css'
import 'antd/lib/spin/style/index.css'
import { Button as AntDButton } from 'antd'
import classnames from 'classnames'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateButtonStyles } from './utils'
import { getDataTestAttributeProp } from '../utils'
import { Skeleton } from '../Skeleton'
import { Spin } from 'components/Spin'
import { ThemeType } from 'components/assets/styles'
import React, { FC, ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		[`.${dark} button`]: generateButtonStyles(dark),
		button: generateButtonStyles(light)
	}
})

export interface ButtonProps extends CommonComponentProps {
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
	focused?: boolean
	/**
	 * Renders a skeleton for the button.
	 */
	loading?: boolean
	/**
	 * Renders an animated loading icon next to the children.
	 */
	pending?: boolean
	/**
	 * Skeleton loader height.
	 */
	skeletonHeight?: number
	/**
	 * Skeleton loader width.
	 */
	skeletonWidth?: number
	/**
	 * Array of classes to pass to button.
	 */
	classes?: string[]
}

export const Button: FC<ButtonProps> = ({
	children,
	classes = [],
	dataTag,
	disabled = false,
	focused = false,
	loading = false,
	onClick,
	pending = false,
	primary = false,
	skeletonHeight = 32,
	skeletonWidth = 75
}: ButtonProps) => {
	useStyles()

	return loading ? (
		<Skeleton height={skeletonHeight} width={skeletonWidth} />
	) : (
		<AntDButton
			autoFocus={focused}
			className={classnames(classes)}
			disabled={pending || disabled}
			onClick={onClick}
			type={primary ? 'primary' : 'default'}
			{...getDataTestAttributeProp('button', dataTag)}
		>
			{pending && (
				<span style={{ paddingRight: 8 }}>
					<Spin />
				</span>
			)}
			{children}
		</AntDButton>
	)
}
