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
	},
	underline: {
		textDecoration: 'underline'
	}
})

const AntDLink = Typography.Link

export type LinkTargetType = '_self' | '_blank'

export interface LinkProps extends CommonComponentProps {
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
	/**
	 * Whether or not the link is underlined.
	 */
	underline?: boolean
	/**
	 * The URL the link goes to.
	 */
	href?: string
	/**
	 * Click handler. **Note**: Either an `onClick` or `href` is required.
	 */
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const Link: FC<LinkProps> = ({
	classes = [],
	children,
	dataTag,
	href,
	onClick,
	target = '_self',
	underline = true
}: LinkProps) => {
	const componentClasses = useStyles()

	const linkClasses = cn({ [componentClasses.underline]: underline }, classes)

	return (
		<AntDLink
			className={linkClasses}
			href={href}
			onClick={onClick}
			target={target}
			underline={underline}
			{...getDataTestAttributeProp('link', dataTag)}
		>
			{children}
		</AntDLink>
	)
}
