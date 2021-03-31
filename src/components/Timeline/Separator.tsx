import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TimelineState } from './types'
import { faChevronDown, faPlusCircle } from '@fortawesome/pro-regular-svg-icons'
import { faCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import {
	generateThemedChevronStyles,
	generateThemedConnectorStyles
} from './utils'
import React, { FC } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType
const { flexDown, font } = styleguide

const useStyles = createUseStyles({
	chevron: {
		...generateThemedChevronStyles(light),
		fontSize: 10,
		left: -4,
		position: 'absolute',
		top: -7
	},
	chevronWrapper: { position: 'relative' },
	connector: {
		...generateThemedConnectorStyles(light),
		flexGrow: 1,
		width: 1
	},
	icon: {
		...font.body,
		cursor: ({ state }) =>
			state === TimelineState.alwaysExpanded ? 'auto' : 'pointer',
		margin: `${14}px 0px`
	},
	separator: {
		...flexDown,
		alignItems: 'center'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $chevron': generateThemedChevronStyles(dark),
			'& $connector': generateThemedConnectorStyles(dark)
		}
	}
})

const iconMap = {
	[TimelineState.alwaysExpanded]: faCircle,
	[TimelineState.collapsed]: faPlusCircle,
	[TimelineState.expanded]: faMinusCircle
}

interface SeparatorProps {
	isLastItem?: boolean
	onClick?: () => void
	state?: TimelineState
}

export const Separator: FC<SeparatorProps> = ({
	isLastItem = false,
	onClick,
	state = TimelineState.collapsed
}: SeparatorProps) => {
	const classes = useStyles({ state })

	return (
		<div className={classes.separator}>
			<FontAwesomeIcon
				className={classes.icon}
				icon={iconMap[state]}
				onClick={onClick}
			/>
			{!isLastItem && (
				<>
					<span className={classes.connector} />
					<span className={classes.chevronWrapper}>
						<FontAwesomeIcon
							className={classes.chevron}
							icon={faChevronDown}
							size='xs'
						/>
					</span>
				</>
			)}
		</div>
	)
}
