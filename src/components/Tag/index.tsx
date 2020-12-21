import 'antd/lib/tag/style/index.css'
import { Tag as AntDTag } from 'antd'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateThemedTagStyles } from './utils'
import { ThemeType } from '../assets/styles/themes'
import React, { FC, ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		span: generateThemedTagStyles(light),
		[`.${dark}`]: {
			'& $span': generateThemedTagStyles(dark)
		}
	}
})

export interface TagProps {
	/**
	 * Tag children to render including tag text
	 */
	children: ReactNode
	/**
	 * Array of classes to pass to element
	 * @default []
	 */
	classes?: string[]
	/**
	 * Color of tag - rgb color value(eg. `rgb(255, 0, 0)`)
	 */
	color?: string
	/**
	 * Whether the Tag can be closed or not. A closable Tag is rendered with a clickable 'X' at the end
	 * @default true
	 */
	closable?: boolean
	/**
	 * Optional callback that runs when Tag is closed if it is closable
	 */
	onClose?: Function
}

export const Tag: FC<TagProps> = ({
	children,
	classes = [],
	closable = true,
	color,
	onClose
}: TagProps) => {
	useStyles()

	return (
		<AntDTag
			className={cn(classes)}
			closable={closable}
			color={color}
			onClose={onClose}
		>
			{children}
		</AntDTag>
	)
}
