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

const { alwaysExpanded, collapsed, expanded } = TimelineState

const { dark, light } = ThemeType
const { flexDown, font, spacing } = styleguide

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
		cursor: ({ state }) => (state === alwaysExpanded ? 'auto' : 'pointer'),
		margin: {
			bottom: 14,
			top: 14
		}
	},
	separator: {
		...flexDown,
		alignItems: 'center',
		paddingRight: spacing.s
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
	[alwaysExpanded]: faCircle,
	[collapsed]: faPlusCircle,
	[expanded]: faMinusCircle
}

interface SeparatorProps {
	isLastItem?: boolean
	onClick?: () => void
	state?: TimelineState
}

export const Separator: FC<SeparatorProps> = ({
	isLastItem = false,
	onClick,
	state = collapsed
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
