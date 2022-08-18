import clamp from 'lodash/clamp'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import isEmpty from 'lodash/isEmpty'
import { SplitPaneCtxProvider } from './SplitPaneContext'
import { LeftPaneBounds, TopPaneBounds } from './utils'
import React, {
	FC,
	MouseEventHandler,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'

const SAVED_PANE_SETTINGS = 'savedPaneSettings'

const useStyles = createUseStyles({
	container: ({ type }: SplitPaneType) => ({
		display: 'flex',
		flexDirection: type === 'column' ? 'column' : 'row',
		height: '100%',
		overflow: 'auto',
		width: '100%'
	})
})

export interface SplitPaneType {
	type: 'column' | 'row'
}

interface CommonSplitPaneTypes extends SplitPaneType {
	children: ReactNode
	classes?: string[]
	id: string
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

interface SavedPaneSettings {
	[id: string]: PaneSetting
}

export const SplitPane: FC<SplitPaneProps> = ({
	bounds = {},
	children,
	classes = [],
	id = '',
	type
}: SplitPaneProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const dividerPosition = useRef<DividerPosition>({ x: null, y: null })

	const compClasses = useStyles({ type })

	const [clientHeight, setClientHeight] = useState(0)
	const [clientWidth, setClientWidth] = useState(0)

	useEffect(() => {
		const localSettings = localStorage.getItem(SAVED_PANE_SETTINGS)

		if (localSettings) {
			const parsedSettings = JSON.parse(localSettings)

			if (parsedSettings[id]) {
				const { clientHeight, clientWidth } = parsedSettings[id]

				setClientHeight(clientHeight)
				setClientWidth(clientWidth)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
		dividerPosition.current = {
			x: e.clientX,
			y: e.clientY
		}
	}

	const savePaneSettings = useCallback(() => {
		const localSettings = localStorage.getItem(SAVED_PANE_SETTINGS)
		const currPaneSettings: SavedPaneSettings = {
			[id]: {
				clientHeight: clientHeight,
				clientWidth: clientWidth
			}
		}

		if (localSettings) {
			const parsedSettings = JSON.parse(localSettings)

			if (!isEmpty(parsedSettings)) {
				localStorage.setItem(
					SAVED_PANE_SETTINGS,
					JSON.stringify({
						...parsedSettings,
						...currPaneSettings
					})
				)
			}
		} else {
			localStorage.setItem(
				SAVED_PANE_SETTINGS,
				JSON.stringify(currPaneSettings)
			)
		}
	}, [clientHeight, clientWidth, id])

	const getClampedCoordinates = useCallback(
		(clientX: number, clientY: number) => {
			let { bottom, left, right, top } =
				containerRef.current?.getClientRects()[0] || {
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
			dividerPosition.current = {
				x: null,
				y: null
			}
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

			savePaneSettings()
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
