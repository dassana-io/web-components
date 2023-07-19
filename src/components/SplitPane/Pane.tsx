import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import Resizer from './Resizer'
import { useSplitPaneCtx } from './SplitPaneContext'
import React, { type FC, type ReactNode, useEffect, useRef } from 'react'

const useStyles = createUseStyles({
	pane: {
		overflow: 'auto'
	}
})

interface PaneProps {
	classes?: string[]
	children: ReactNode
	position: 'bottom' | 'left' | 'right' | 'top'
}

const Pane: FC<PaneProps> = ({
	classes = [],
	children,
	position
}: PaneProps) => {
	const compClasses = useStyles()

	const ref = useRef<HTMLDivElement>(null)

	const { clientHeight, clientWidth, setClientHeight, setClientWidth } =
		useSplitPaneCtx()

	useEffect(() => {
		if (position === 'top' && ref.current) {
			if (clientHeight) {
				ref.current.style.minHeight = clientHeight + 'px'
				ref.current.style.maxHeight = clientHeight + 'px'
			} else {
				setClientHeight(ref.current.clientHeight)
			}
		}
	}, [clientHeight, position, setClientHeight])

	useEffect(() => {
		if (position === 'left' && ref.current) {
			if (clientWidth) {
				ref.current.style.minWidth = clientWidth + 'px'
				ref.current.style.maxWidth = clientWidth + 'px'
			} else {
				setClientWidth(ref.current.clientWidth)
			}
		}
	}, [clientWidth, position, setClientWidth])

	return (
		<>
			{(position === 'bottom' || position === 'right') && <Resizer />}
			<div className={cn(compClasses.pane, classes)} ref={ref}>
				{children}
			</div>
		</>
	)
}

export default Pane
