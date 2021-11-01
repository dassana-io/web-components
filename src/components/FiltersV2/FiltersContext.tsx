import { createCtx } from '@dassana-io/web-utils'
import { UseFiltersType } from './useFilters'

const [useFiltersContext, FiltersCtxProvider] = createCtx<UseFiltersType>()

export { FiltersCtxProvider, useFiltersContext }
