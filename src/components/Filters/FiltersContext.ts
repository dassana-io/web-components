import { createCtx } from '@dassana-io/web-utils'
import { SelectOption } from '../Select'
import {
	FiltersConfig,
	FiltersMode,
	FiltersProps,
	OnSearchWrapper,
	ProcessedFilters
} from './types'

export interface FiltersContextProps {
	allFilters: ProcessedFilters
	config?: FiltersConfig
	dynamicOptions?: SelectOption[]
	dynamicSearchVal?: string
	loading?: boolean
	mode: FiltersMode
	onSearchWrapper?: OnSearchWrapper
	onSelectedFiltersChange: FiltersProps['onSelectedFiltersChange']
	pending?: boolean
	resetDynamicProps?: () => void
	value?: FiltersProps['value']
}

const [useFiltersContext, FiltersCtxProvider] = createCtx<FiltersContextProps>()

export { FiltersCtxProvider, useFiltersContext }
