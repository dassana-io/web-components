import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const AntDLink = Typography.Link

export type LinkType = 'warning' | 'secondary' | 'danger' | undefined

export type LinkTargetType = '_self' | '_blank' | '_parent' | '_top'

export interface LinkProps {
	children?: ReactNode
	onClick?: () => void
	target?: LinkTargetType
	href: string
}

interface AntDProps extends LinkProps {
	underline: boolean
}

const Link: FC<LinkProps> = ({
	children,
	onClick,
	target = '_self',
	href
}: LinkProps) => {
	const antDProps: AntDProps = {
		href,
		target,
		underline: true
	}

	if (onClick) antDProps.onClick = onClick

	return <AntDLink {...antDProps}>{children}</AntDLink>
}

export default Link
