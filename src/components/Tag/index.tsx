import { Tag as AntDTag } from 'antd'
import React, { FC, ReactNode } from 'react'

export interface TagProps {
	children?: ReactNode
	color?: string
}

const Tag: FC<TagProps> = ({ children, color }: TagProps) => {
	return <AntDTag color={color}>{children}</AntDTag>
}

export default Tag
