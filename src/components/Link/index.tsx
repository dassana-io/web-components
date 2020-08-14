import 'antd/lib/typography/style/index.css'
<<<<<<< HEAD
import { createUseStyles } from 'react-jss'
import { linkColor } from 'styles/styleguide'
=======
>>>>>>> Feat #43 - Tag, Link components
import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const AntDLink = Typography.Link

export type LinkTargetType = '_self' | '_blank'

<<<<<<< HEAD
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

=======
export interface LinkProps {
	children: ReactNode
	href?: string
	onClick?: () => void
	target?: LinkTargetType
}

interface AntDProps extends LinkProps {
	underline: boolean
}

>>>>>>> Feat #43 - Tag, Link components
const Link: FC<LinkProps> = ({
	children,
	href,
	onClick,
	target = '_self'
}: LinkProps) => {
<<<<<<< HEAD
	useStyles()

	const antDProps: AntDProps = {
		href,
		onClick,
=======
	const antDProps: AntDProps = {
		children,
>>>>>>> Feat #43 - Tag, Link components
		target,
		underline: true
	}

<<<<<<< HEAD
	return <AntDLink {...antDProps}>{children}</AntDLink>
=======
	if (onClick !== undefined) antDProps.onClick = onClick
	if (href !== undefined) antDProps.href = href

	return <AntDLink {...antDProps} />
>>>>>>> Feat #43 - Tag, Link components
}

export default Link
