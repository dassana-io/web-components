import { BaseFilters } from '../BaseFilters'
import { FiltersCtxProvider } from '../FiltersContext'
import { processFilters } from '../utils'
import { v4 as uuidV4 } from 'uuid'
import {
	ClientSideFiltersProps,
	FiltersList,
	FiltersMode,
	ProcessedFilters
} from '../types'
import React, { FC, useEffect, useState } from 'react'

type ClientSide = Omit<ClientSideFiltersProps, 'mode'>

export const ClientSideFilters: FC<ClientSide> = ({
	config,
	filterOptions = [],
	onSelectedFiltersChange
}: ClientSide) => {
	// Since there are no API calls in a frontend filter,
	// related data will live in this component instead of
	// a custom useFilters hook like in ServerSideFilters.
	const [allFilters, setAllFilters] = useState<ProcessedFilters>({})

	// filtersList is initialized with an object with just the ID so
	// that when users open the filter popover there is a blank filter
	// and they don't have to manually press the Add Filter button
	const [filtersList, setFiltersList] = useState<FiltersList>([
		{ id: uuidV4() }
	])

	useEffect(() => {
		setAllFilters(processFilters(filterOptions))
	}, [filterOptions])

	return (
		<FiltersCtxProvider
			value={{
				allFilters,
				config,
				filtersList,
				onSelectedFiltersChange,
				setFiltersList
			}}
		>
			<BaseFilters mode={FiltersMode.frontend} />
		</FiltersCtxProvider>
	)
}
