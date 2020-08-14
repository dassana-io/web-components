import 'antd/lib/typography/style/index.css'
import { createUseStyles } from 'react-jss'
import { linkColor } from 'styles/styleguide'
import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const AntDLink = Typography.Link

export type LinkTargetType = '_self' | '_blank'

interface SharedLinkProps {
	/**
	 * Link children to render including link text.
	 */
	children: ReactNode
	/**
	 * Where to open the linked url - either in a new tab or the current browsing context.
	 */
	target?: LinkTargetType
}

interface LinkHref extends SharedLinkProps {
	/**
	 * The URL the link goes to.
	 */
	href: string
	/**
	 * Click handler. **Note**: Either an `onClick` or `href` is required.
	 */
	onClick?: never
}

interface LinkClick extends SharedLinkProps {
	href?: never
	onClick: () => void
}

export type LinkProps = LinkHref | LinkClick

interface AntDProps extends Omit<LinkProps, 'children'> {
	underline: boolean
}

const useStyles = createUseStyles({
	'@global': {
		'a.ant-typography, .ant-typography a': {
			color: linkColor
		}
	}
})

const Link: FC<LinkProps> = ({
	children,
	href,
	onClick,
	target = '_self'
}: LinkProps) => {
	useStyles()

	const antDProps: AntDProps = {
		href,
		onClick,
		target,
		underline: true
	}
	if (!onClick && !href)
		throw new Error('Link requires either an onClick or href prop.')

	return <AntDLink {...antDProps}>{children}</AntDLink>
}

export default Link
