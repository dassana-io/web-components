import { createCtx } from '@dassana-io/web-utils'

export interface TableContextProps {
	isMobile: boolean
}

const [useTableContext, TableCtxProvider] = createCtx<TableContextProps>()

export { TableCtxProvider, useTableContext }
