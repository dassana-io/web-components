import 'antd/lib/typography/style/index.css'
import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const AntDLink = Typography.Link

export type LinkTargetType = '_self' | '_blank'

export interface LinkProps {
	/**
	 * Link children to render including link text.
	 */
	children: ReactNode
	/**
	 * The URL the link goes to.
	 */
	href?: string
	/**
	 * Click handler. **Note**: While both `onClick` and `href` are optional, one of them is required.
	 */
	onClick?: () => void
	/**
	 * Where to open the linked url - either in a new tab or the current browsing context.
	 * */
	target?: LinkTargetType
}

interface AntDProps extends LinkProps {
	underline: boolean
}

const Link: FC<LinkProps> = ({
	children,
	href,
	onClick,
	target = '_self'
}: LinkProps) => {
	const antDProps: AntDProps = {
		children,
		target,
		underline: true
	}
	if (!onClick && !href)
		throw new Error('Link requires either an onClick or href prop.')

	if (onClick) antDProps.onClick = onClick
	if (href) antDProps.href = href

	return <AntDLink {...antDProps} />
}

export default Link
