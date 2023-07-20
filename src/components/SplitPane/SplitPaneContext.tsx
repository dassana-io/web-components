import { createCtx } from '@dassana-io/web-utils'
import { type Dispatch, type MouseEventHandler, type SetStateAction } from 'react'

interface SplitPaneCtxProps {
	clientHeight: number
	setClientHeight: Dispatch<SetStateAction<number>>
	clientWidth: number
	setClientWidth: Dispatch<SetStateAction<number>>
	onMouseDown: MouseEventHandler<HTMLDivElement>
	type: 'column' | 'row'
}

export const [useSplitPaneCtx, SplitPaneCtxProvider] =
	createCtx<SplitPaneCtxProps>()
