import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Link } from '../Link'
import { styleguide } from '../assets/styles'
import React, { FC, ReactNode } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	breadcrumb: {
		'&:not(:last-of-type)::after': {
			// eslint-disable-next-line quotes
			content: "'/'",
			paddingLeft: spacing.s
		},
		paddingRight: spacing.s
	},
	container: {
		display: 'flex'
	}
})

export interface BreadcrumbConfig {
	label: string | ReactNode
	onClick?: () => void
}

interface Props {
	classes?: string[]
	config: BreadcrumbConfig[]
}

export const Breadcrumbs: FC<Props> = ({ classes = [], config }: Props) => {
	const breadCrumbsClasses = useStyles()

	const renderBreadcrumb = ({ label, onClick }: BreadcrumbConfig) =>
		onClick ? <Link onClick={onClick}>{label}</Link> : label

	return (
		<div className={cn(breadCrumbsClasses.container, classes)}>
			{config.map((item, i) => (
				<div className={breadCrumbsClasses.breadcrumb} key={i}>
					{renderBreadcrumb(item)}
				</div>
			))}
		</div>
	)
}
