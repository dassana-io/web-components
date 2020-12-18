import 'antd/lib/tag/style/index.css'
import { Tag as AntDTag } from 'antd'
import cn from 'classnames'
import React, { FC, ReactNode } from 'react'

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
	 * Color of tag - either a preset (`red`, `blue`, `green` etc.), a hex color code(eg. `#ffffff`) or a rgb color value(eg. `rgb(255, 0, 0)`)
	 */
	color?: string
	/**
	 * Whether the Tag can be closed or not. A closable Tag is rendered with a clickable 'X' at the end
	 * @default true
	 */
	closable?: boolean
}

export const Tag: FC<TagProps> = ({
	children,
	classes = [],
	closable = true,
	color
}: TagProps) => (
	<AntDTag className={cn(classes)} closable={closable} color={color}>
		{children}
	</AntDTag>
)
