import { createUseStyles } from 'react-jss'
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TimelineState } from './types'
import { faCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { dark } = ThemeType
const {
	colors: { blacks },
	flexDown,
	font
} = styleguide

const useStyles = createUseStyles({
	connector: {
		backgroundColor: blacks['lighten-80'],
		flexGrow: 1,
		width: 1
	},
	icon: {
		...font.body,
		cursor: ({ state }) =>
			state === TimelineState.uncollapsible ? 'auto' : 'pointer'
	},
	separator: {
		...flexDown,
		alignItems: 'center'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $connector': { backgroundColor: blacks['lighten-20'] }
		}
	}
})

interface Props {
	onClick?: () => void
	state?: TimelineState
}

const iconMap = {
	[TimelineState.default]: faPlusCircle,
	[TimelineState.active]: faMinusCircle,
	[TimelineState.uncollapsible]: faCircle
}

export const TimelineSeparator: FC<Props> = ({
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
		</div>
	)
}
