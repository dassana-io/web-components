import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'components/Link'
import { styleguide } from 'components/assets/styles'
import { Tooltip } from 'components/Tooltip'
import { capitalize, filter } from 'lodash'
import { faFileEdit, faFileWord } from '@fortawesome/pro-regular-svg-icons'
import { faGithub, faSlack } from '@fortawesome/free-brands-svg-icons'
import React, { FC } from 'react'

const {
	borderRadius,
	colors: { blacks, whites },
	flexAlignCenter,
	flexDown,
	spacing
} = styleguide

const useStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		...flexDown,
		background: blacks['lighten-20'],
		borderRadius,
		color: blacks['lighten-70'],
		padding: spacing.m,
		position: 'fixed',
		right: spacing.m,
		top: '50%',
		transform: 'translateY(-50%)',
		zIndex: 2
	},
	faIcon: {
		'&:hover': {
			color: whites.base
		},
		'&:last-of-type': {
			marginBottom: 0
		},
		cursor: 'pointer',
		marginBottom: spacing['s+']
	}
})

export enum SocialLinks {
	github = 'github',
	blog = 'blog',
	docs = 'docs',
	slack = 'slack'
}

const { github, blog, docs, slack } = SocialLinks

export interface MiniSidebarProps {
	socialLinksToOmit?: SocialLinks[]
}

const MiniSidebarConfig = [
	{
		href: '',
		icon: faGithub,
		label: github
	},
	{
		href: '',
		icon: faFileWord,
		label: docs
	},
	{
		href: '',
		icon: faSlack,
		label: slack
	},
	{
		href: '',
		icon: faFileEdit,
		label: blog
	}
]

const MiniSidebar: FC<MiniSidebarProps> = ({
	socialLinksToOmit = []
}: MiniSidebarProps) => {
	const classes = useStyles()

	const filteredSocials = filter(
		MiniSidebarConfig,
		({ label }) => !socialLinksToOmit.includes(label)
	)

	return (
		<div className={classes.container}>
			{filteredSocials.map(({ label, href, icon }, i) => (
				<Tooltip
					key={i}
					title={capitalize(label)}
					tooltipTriggerClasses={[classes.faIcon]}
				>
					<Link href={href} target='_blank'>
						<FontAwesomeIcon icon={icon} />
					</Link>
				</Tooltip>
			))}
		</div>
	)
}

export default MiniSidebar
