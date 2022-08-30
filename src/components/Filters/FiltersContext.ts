import { createCtx } from '@dassana-io/web-utils'
import { SelectOption } from '../Select'
import {
	FiltersConfig,
	FiltersList,
	FiltersMode,
	FiltersProps,
	OnSearchWrapper,
	ProcessedFilters
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
	onSelectedFiltersChange: FiltersProps['onSelectedFiltersChange']
	pending?: boolean
	popoverClasses?: string[]
	resetDynamicProps?: () => void
}

const [useFiltersContext, FiltersCtxProvider] = createCtx<FiltersContextProps>()

export { FiltersCtxProvider, useFiltersContext }
