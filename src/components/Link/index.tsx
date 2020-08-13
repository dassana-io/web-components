import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const AntDLink = Typography.Link

export type LinkType = 'warning' | 'secondary' | 'danger' | undefined

export type LinkTargetType = '_self' | '_blank' | '_parent' | '_top'

export interface LinkProps {
	children?: ReactNode
	onClick?: () => void
	target?: LinkTargetType
	type?: LinkType
	url: string
	underline?: boolean
}

interface AntDProps extends Omit<LinkProps, 'url'> {
	href: string
}

const Link: FC<LinkProps> = ({
	children,
	onClick,
	type = undefined,
	target = '_self',
	url,
	underline = false
}: LinkProps) => {
	const antDProps: AntDProps = {
		href: url,
		target,
		type,
		underline
	}

	if (onClick) antDProps.onClick = onClick

	return <AntDLink {...antDProps}>{children}</AntDLink>
}

export default Link
