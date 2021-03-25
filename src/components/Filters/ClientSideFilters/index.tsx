import { BaseFilters } from '../BaseFilters'
import { FiltersCtxProvider } from '../FiltersContext'
import { processFilters } from '../utils'
import { v4 as uuidV4 } from 'uuid'
import { ClientSideFiltersProps, FiltersList, ProcessedFilters } from '../types'
import React, { FC, useEffect, useState } from 'react'

type ClientSide = Omit<ClientSideFiltersProps, 'mode'>

export const ClientSideFilters: FC<ClientSide> = ({
	config,
	filterOptions = [],
	onSelectedFiltersChange
}: ClientSide) => {
	const [allFilters, setAllFilters] = useState<ProcessedFilters>({})
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
			<BaseFilters mode='frontend' />
		</FiltersCtxProvider>
	)
}
