import { createCtx } from '@dassana-io/web-utils'
import { SelectOption } from '../Select'
import { Dispatch, SetStateAction } from 'react'
import {
	FiltersConfig,
	FiltersList,
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
	onSearchWrapper?: OnSearchWrapper
	onSelectedFiltersChange: FiltersProps['onSelectedFiltersChange']
	pending?: boolean
	setFiltersList: Dispatch<SetStateAction<FiltersList>>
}

const [useFiltersContext, FiltersCtxProvider] = createCtx<FiltersContextProps>()

export { FiltersCtxProvider, useFiltersContext }
