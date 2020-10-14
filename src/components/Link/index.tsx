import 'antd/lib/typography/style/index.css'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateLinkStyles } from './utils'
import { getDataTestAttributeProp } from '../utils'
import { ThemeType } from '../assets/styles/themes'
import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	'@global': {
		[`.${dark}`]: {
			'& $a': generateLinkStyles(dark)
		},
		a: generateLinkStyles(light)
	}
})

const AntDLink = Typography.Link

export type LinkTargetType = '_self' | '_blank'

export interface SharedLinkProps extends CommonComponentProps {
	/**
	 * Array of classes to pass to element
	 */
	classes?: string[]
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

export const Link: FC<LinkProps> = ({
	classes = [],
	children,
	dataTag,
	href,
	onClick,
	target = '_self'
}: LinkProps) => {
	useStyles()

	const linkClasses = cn(classes)

	return (
		<AntDLink
			className={linkClasses}
			href={href}
			onClick={onClick}
			target={target}
			{...getDataTestAttributeProp('link', dataTag)}
		>
			{children}
		</AntDLink>
	)
}
