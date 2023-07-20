import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Helmet } from 'react-helmet'
import { styleguide } from '../assets/styles'
import React, { type FC, type ReactNode } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		padding: spacing.l
	}
})

export interface PageContainerProps {
	children: ReactNode
	classes?: string[]
	/**
	 * The HTML document's title that is shown in a browser's title bar or a page's tab
	 */
	documentTitle?: string
}

export const PageContainer: FC<PageContainerProps> = ({
	children,
	classes = [],
	documentTitle = 'Dassana'
}: PageContainerProps) => {
	const containerClases = useStyles()

	return (
		<div className={cn(containerClases.container, classes)}>
			{documentTitle && (
				<Helmet>
					<title>{documentTitle}</title>
				</Helmet>
			)}
			{children}
		</div>
	)
}
