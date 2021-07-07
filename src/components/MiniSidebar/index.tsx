import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'components/Link'
import { styleguide } from 'components/assets/styles'
import { Tooltip } from 'components/Tooltip'
import { faFileEdit, faFileWord } from '@fortawesome/pro-regular-svg-icons'
import {
	faGithub,
	faSlack,
	IconDefinition
} from '@fortawesome/free-brands-svg-icons'
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

export interface MiniSidebarProps {
	config: SidebarConfig[]
}

export interface SidebarConfig {
	href: string
	label: string
}

interface SidebarIconMapProps {
	[icon: string]: IconDefinition
}

const SidebarIconMap: SidebarIconMapProps = {
	Blog: faFileEdit,
	Docs: faFileWord,
	Github: faGithub,
	Slack: faSlack
}

const MiniSidebar: FC<MiniSidebarProps> = ({ config }: MiniSidebarProps) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			{config.map(({ href, label }, i) => (
				<Tooltip
					key={i}
					title={label}
					tooltipTriggerClasses={[classes.faIcon]}
				>
					<Link href={href} target='_blank'>
						<FontAwesomeIcon icon={SidebarIconMap[label]} />
					</Link>
				</Tooltip>
			))}
		</div>
	)
}

export default MiniSidebar
