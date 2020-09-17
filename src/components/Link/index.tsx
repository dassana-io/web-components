import 'antd/lib/typography/style/index.css'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import { linkColor } from '../assets/styleguide'
import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const AntDLink = Typography.Link

export type LinkTargetType = '_self' | '_blank'

export interface SharedLinkProps extends CommonComponentProps {
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
	dataTag,
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

	return (
		<AntDLink {...antDProps} {...getDataTestAttributeProp('link', dataTag)}>
			{children}
		</AntDLink>
	)
}

export default Link
