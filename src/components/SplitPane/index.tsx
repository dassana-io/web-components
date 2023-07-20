import clamp from 'lodash/clamp'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { SplitPaneCtxProvider } from './SplitPaneContext'
import { unstable_batchedUpdates } from 'react-dom'
import { type LeftPaneBounds, type TopPaneBounds } from './utils'
import React, {
	type FC,
	type MouseEventHandler,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'

interface StyleProps {
	resizing: boolean
	type: SplitPaneType['type']
}

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: ({ type }: StyleProps) =>
			type === 'column' ? 'column' : 'row',
		height: '100%',
		overflow: 'auto',
		userSelect: ({ resizing }: StyleProps) => (resizing ? 'none' : 'auto'),
		width: '100%'
	}
})

export interface SplitPaneType {
	type: 'column' | 'row'
}

interface CommonSplitPaneTypes extends SplitPaneType {
	children: ReactNode
	classes?: string[]
	onPaneResize: (paneDimensions: PaneSetting) => void
	paneDimensions?: PaneSetting
}

interface DividerPosition {
	x: number | null
	y: number | null
}

interface VerticalSplitPaneProps extends CommonSplitPaneTypes {
	bounds?: TopPaneBounds
	type: 'column'
}

interface HorizontalSplitPaneProps extends CommonSplitPaneTypes {
	bounds?: LeftPaneBounds
	type: 'row'
}

type SplitPaneProps = HorizontalSplitPaneProps | VerticalSplitPaneProps

export interface PaneSetting {
	clientHeight: number
	clientWidth: number
}

export const SplitPane: FC<SplitPaneProps> = ({
	bounds = {},
	children,
	classes = [],
	onPaneResize,
	paneDimensions,
	type
}: SplitPaneProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const dividerPosition = useRef<DividerPosition>({ x: null, y: null })

	const [resizing, setResizing] = useState(false)

	const compClasses = useStyles({ resizing, type })

	const [clientHeight, setClientHeight] = useState(0)
	const [clientWidth, setClientWidth] = useState(0)

	useEffect(() => {
		if (paneDimensions) {
			const { clientHeight, clientWidth } = paneDimensions

			unstable_batchedUpdates(() => {
				setClientHeight(clientHeight)
				setClientWidth(clientWidth)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
		setResizing(true)

		dividerPosition.current = {
			x: e.clientX,
			y: e.clientY
		}
	}

	const savePaneSettings = useCallback(
		() => onPaneResize({ clientHeight, clientWidth }),
		[clientHeight, clientWidth, onPaneResize]
	)

	const getClampedCoordinates = useCallback(
		(clientX: number, clientY: number) => {
			let { bottom, left, right, top } =
				containerRef.current?.getClientRects()[0] ?? {
					bottom: 0,
					left: 0,
					right: 0,
					top: 0
				}

			if (type === 'row') {
				const { left: minLeft = 0, right: minRight = 0 } =
					bounds as LeftPaneBounds

				left = left + minLeft
				right = right - minRight
			} else {
				const { bottom: minBottom = 0, top: minTop = 0 } =
					bounds as TopPaneBounds

				top = top + minTop
				bottom = bottom - minBottom
			}

			return [clamp(clientX, left, right), clamp(clientY, top, bottom)]
		},
		[bounds, type]
	)

	useEffect(() => {
		const onMouseUp = () => {
			setResizing(false)

			dividerPosition.current = {
				x: null,
				y: null
			}

			savePaneSettings()
		}

		const onMouseMove = (e: MouseEvent) => {
			if (
				dividerPosition.current &&
				dividerPosition.current.y &&
				dividerPosition.current.x
			) {
				const [clampedClientX, clampedClientY] = getClampedCoordinates(
					e.clientX,
					e.clientY
				)

				setClientWidth(
					clientWidth +
						clampedClientX -
						(dividerPosition.current.x || 0)
				)
				setClientHeight(
					clientHeight +
						clampedClientY -
						(dividerPosition.current.y || 0)
				)

				dividerPosition.current = {
					x: clampedClientX,
					y: clampedClientY
				}
			}
		}

		document.addEventListener('mouseup', onMouseUp)
		document.addEventListener('mousemove', onMouseMove)

		return () => {
			document.removeEventListener('mouseup', onMouseUp)
			document.removeEventListener('mousemove', onMouseMove)
		}
	}, [getClampedCoordinates, clientHeight, clientWidth, savePaneSettings])

	return (
		<div className={cn(compClasses.container, classes)} ref={containerRef}>
			<SplitPaneCtxProvider
				value={{
					clientHeight,
					clientWidth,
					onMouseDown,
					setClientHeight,
					setClientWidth,
					type
				}}
			>
				{children}
			</SplitPaneCtxProvider>
		</div>
	)
}

export { default as Pane } from './Pane'
