import { createCtx } from '@dassana-io/web-utils'
import { Key } from 'react'

export interface MenuContextProps {
	activeKey?: Key
	onClick: (menuKey: Key) => void
}

export const [useMenuContext, MenuContextProvider] = createCtx<
	MenuContextProps
>()
