import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Link } from '../Link'
import React, { type FC, type ReactNode } from 'react'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { light, dark } = ThemeType
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
		color: themedStyles[light].base.color,
		display: 'flex'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container:': {
				color: themedStyles[dark].base.color
			}
		}
	}
})

export interface BreadcrumbConfig {
	label: string | ReactNode
	onClick?: () => void
}

export interface BreadCrumbProps {
	classes?: string[]
	config: BreadcrumbConfig[]
}

export const Breadcrumbs: FC<BreadCrumbProps> = ({
	classes = [],
	config
}: BreadCrumbProps) => {
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
