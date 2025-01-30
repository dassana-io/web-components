import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-regular-svg-icons'
import React, { type FC, useCallback, useEffect, useState } from 'react'

const SCROLL_AMOUNT = 200

enum ScrollDirection {
	left = 'left',
	right = 'right'
}

interface StyleProps {
	isArrowsVisible: boolean
}

const useStyles = createUseStyles({
	arrow: {
		alignItems: 'center',
		display: ({ isArrowsVisible }: StyleProps) =>
			isArrowsVisible ? 'flex' : 'none',
		justifyContent: 'center',
		padding: 8,
		width: 60
	},
	scrollableContainer: {
		display: 'flex',
		overflowX: 'auto',
		overscrollBehaviorX: 'none'
	}
})

interface ScrollableTabsProps {
	tabs: any[]
}

export const ScrollableTabs: FC<ScrollableTabsProps> = ({
	tabs
}: ScrollableTabsProps) => {
	const scrollableContentRef = React.useRef<any>(null)

	console.log({ tabs })

	const [, setInitialScrollWidth] = useState(0)
	const [isArrowsVisible, setIsArrowsVisible] = useState(false)
	const [leftArrowEnabled, setLeftArrowEnabled] = useState(false)
	const [rightArrowEnabled, setRightArrowEnabled] = useState(true)

	const classes = useStyles({ isArrowsVisible })

	const handleScroll = useCallback((direction?: ScrollDirection) => {
		const scrollableContent = scrollableContentRef.current

		if (scrollableContent) {
			switch (direction) {
				case ScrollDirection.left:
					scrollableContent.scrollLeft -= SCROLL_AMOUNT
					break
				case ScrollDirection.right:
					scrollableContent.scrollLeft += SCROLL_AMOUNT
			}

			const scrollWidth = scrollableContent.scrollWidth
			const scrollLeft = scrollableContent.scrollLeft
			const offsetWidth = scrollableContent.offsetWidth

			const SCROLL_THRESHOLD = 20 // Pixel leeway

			const reachedScrollBeginning = scrollLeft <= SCROLL_THRESHOLD
			const reachedScrollEnd =
				Math.ceil(scrollLeft + offsetWidth) >=
				Math.floor(scrollWidth - SCROLL_THRESHOLD)

			setLeftArrowEnabled(!reachedScrollBeginning)
			setRightArrowEnabled(!reachedScrollEnd)
		}
	}, [])

	useEffect(() => {
		const scrollableContent = scrollableContentRef.current

		const resizeObserver = new ResizeObserver(entries => {
			const contentWidth = entries[0].contentRect.width

			setIsArrowsVisible(
				!(
					Math.floor(scrollableContent.scrollWidth) <=
					Math.round(contentWidth)
				)
			)

			setInitialScrollWidth(contentWidth)
		})

		resizeObserver.observe(scrollableContent)

		return () => {
			scrollableContent && resizeObserver.unobserve(scrollableContent)
		}
	}, [])

	return (
		<div style={{ display: 'flex' }}>
			<div
				className={classes.arrow}
				onClick={() => handleScroll(ScrollDirection.left)}
				style={{
					boxShadow: leftArrowEnabled
						? '-8px 4px 8px 12px rgba(0, 0, 0, 0.2)'
						: 'none',
					clipPath: 'inset(0% -50% 0 4px)',
					cursor: leftArrowEnabled ? 'pointer' : 'not-allowed',
					opacity: leftArrowEnabled ? 1 : 0.2
				}}
			>
				<FontAwesomeIcon icon={faAngleLeft} size='sm' />
			</div>

			<div
				className={classes.scrollableContainer}
				onScroll={() => handleScroll()}
				ref={scrollableContentRef}
			>
				{tabs}
			</div>

			<div
				className={classes.arrow}
				onClick={() => handleScroll(ScrollDirection.right)}
				style={{
					boxShadow: rightArrowEnabled
						? '8px 4px 8px 12px rgba(0, 0, 0, 0.2)'
						: 'none',
					clipPath: 'inset(0% 4px 0% -50%)',
					cursor: rightArrowEnabled ? 'pointer' : 'not-allowed',
					opacity: rightArrowEnabled ? 1 : 0.2
				}}
			>
				<FontAwesomeIcon icon={faAngleRight} size='sm' />
			</div>
		</div>
	)
}
