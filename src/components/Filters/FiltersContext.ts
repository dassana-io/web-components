import { createCtx } from '@dassana-io/web-utils'
import { SelectOption } from '../Select'
import { Dispatch, SetStateAction } from 'react'
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
	dynamicOptions?: SelectOption[]
	dynamicSearchVal?: string
	filtersList: FiltersList
	loading?: boolean
	mode: FiltersMode
	onSearchWrapper?: OnSearchWrapper
	onSelectedFiltersChange: FiltersProps['onSelectedFiltersChange']
	pending?: boolean
	resetDynamicProps?: () => void
	setFiltersList: Dispatch<SetStateAction<FiltersList>>
}

const [useFiltersContext, FiltersCtxProvider] = createCtx<FiltersContextProps>()

export { FiltersCtxProvider, useFiltersContext }
