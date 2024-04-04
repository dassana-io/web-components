import { createUseStyles } from 'react-jss'
import React, { type FC, type ReactNode } from 'react'

const useStyles = createUseStyles({
	cursorNotAllowed: {
		cursor: 'not-allowed'
	},
	pointerEventsNone: {
		pointerEvents: 'none'
	}
})

interface PointerEventsNoneProps {
	children: ReactNode
	shouldDisablePointerEvents: boolean
}

export const PointerEventsNone: FC<PointerEventsNoneProps> = ({
	children,
	shouldDisablePointerEvents
}) => {
	const classes = useStyles()

	if (!shouldDisablePointerEvents) {
		return <div>{children}</div>
	}

	return (
		// https://stackoverflow.com/a/46665946
		<div className={classes.cursorNotAllowed}>
			<div className={classes.pointerEventsNone}>{children}</div>
		</div>
	)
}
