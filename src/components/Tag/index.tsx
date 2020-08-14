import 'antd/lib/tag/style/index.css'
import { Tag as AntDTag } from 'antd'
import React, { FC, ReactNode } from 'react'

export interface TagProps {
<<<<<<< HEAD
	/**
	 * Tag children to render including tag text.
	 */
	children: ReactNode
	/**
	 * Color of tag - either a preset (`red`, `blue`, `green` etc.), a hex color code(eg. `#ffffff`) or a rgb color value(eg. `rgb(255, 0, 0)`).
	 */
=======
	children: ReactNode
>>>>>>> Feat #43 - Tag, Link components
	color?: string
}

const Tag: FC<TagProps> = ({ children, color }: TagProps) => {
	return <AntDTag color={color}>{children}</AntDTag>
}

export default Tag
