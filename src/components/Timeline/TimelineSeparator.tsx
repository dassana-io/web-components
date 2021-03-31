import { createUseStyles } from 'react-jss'
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TimelineState } from './types'
import { faCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import {
	generateThemedChevronStyles,
	generateThemedConnectorStyles
} from './utils'
import React, { FC } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

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
		cursor: ({ state }) =>
			state === TimelineState.uncollapsible ? 'auto' : 'pointer',
		margin: `${spacing.xs + spacing.s}px 0px`
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
	[TimelineState.default]: faPlusCircle,
	[TimelineState.active]: faMinusCircle,
	[TimelineState.uncollapsible]: faCircle
}

interface Props {
	isLastItem?: boolean
	onClick?: () => void
	state?: TimelineState
}

export const TimelineSeparator: FC<Props> = ({
	isLastItem = false,
	onClick,
	state = TimelineState.default
}: Props) => {
	const classes = useStyles({ state })

	return (
		<div className={classes.separator}>
			<FontAwesomeIcon
				className={classes.icon}
				icon={iconMap[state]}
				onClick={onClick}
			/>
			<span className={classes.connector} />
			{!isLastItem && (
				<span className={classes.chevronWrapper}>
					<FontAwesomeIcon
						className={classes.chevron}
						icon={faChevronDown}
						size='xs'
					/>
				</span>
			)}
		</div>
	)
}
