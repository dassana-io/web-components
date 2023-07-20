import { createCtx } from '@dassana-io/web-utils'
import { type SelectOption } from '../Select'
import {
	type FiltersConfig,
	type FiltersList,
	type FiltersMode,
	type FiltersProps,
	type OnSearchWrapper,
	type ProcessedFilters
} from './types'

export interface FiltersContextProps {
	allFilters: ProcessedFilters
	config?: FiltersConfig
	defaultFilters?: FiltersList
	dynamicOptions?: SelectOption[]
	dynamicSearchVal?: string
	loading?: boolean
	minKeySelectInputWidth?: number
	mode: FiltersMode
	onSearchWrapper?: OnSearchWrapper
	onClearFilters?: FiltersProps['onClearFilters']
	onSelectedFiltersChange: FiltersProps['onSelectedFiltersChange']
	pending?: boolean
	popoverClasses?: string[]
	resetDynamicProps?: () => void
}

const [useFiltersContext, FiltersCtxProvider] = createCtx<FiltersContextProps>()

export { FiltersCtxProvider, useFiltersContext }
