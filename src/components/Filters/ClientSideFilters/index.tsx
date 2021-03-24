import { BaseFilters } from '../BaseFilters'
import { processFilters } from '../utils'
import { ClientSideFiltersProps, FiltersList, ProcessedFilters } from '../types'
import React, { FC, useEffect, useState } from 'react'

type ClientSide = Omit<ClientSideFiltersProps, 'type'>

export const ClientSideFilters: FC<ClientSide> = ({
	config,
	filterOptions = [],
	onSelectedFiltersChange
}: ClientSide) => {
	const [allFilters, setAllFilters] = useState<ProcessedFilters>({})
	const [filtersList, setFiltersList] = useState<FiltersList>([])

	useEffect(() => {
		setAllFilters(processFilters(filterOptions))
	}, [filterOptions])

	return (
		<BaseFilters
			allFilters={allFilters}
			config={config}
			filtersList={filtersList}
			onSelectedFiltersChange={onSelectedFiltersChange}
			setFiltersList={setFiltersList}
			type='frontend'
		/>
	)
}
