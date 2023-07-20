import { BaseFilters } from '../BaseFilters'
import { FiltersCtxProvider } from '../FiltersContext'
import { type ServerSideFiltersProps } from '../types'
import { useFilters } from './utils'
import React, { type FC, useMemo } from 'react'

export const ServerSideFilters: FC<ServerSideFiltersProps> = ({
	onFilterSuggest,
	onFiltersFetch,
	filtersRef,
	omittedFilterKeys = [],
	...rest
}: ServerSideFiltersProps) => {
	// useFilters is where all the related data will be held.
	// API calls will also be handled in useFilters.
	const useFiltersInitialization = useMemo(
		() => ({
			omittedFilterKeys,
			onFilterSuggest,
			onFiltersFetch
		}),
		[omittedFilterKeys, onFilterSuggest, onFiltersFetch]
	)

	const filterMethods = useFilters(useFiltersInitialization)

	return (
		<FiltersCtxProvider
			value={{
				...filterMethods,
				...rest
			}}
		>
			<BaseFilters filtersRef={filtersRef} />
		</FiltersCtxProvider>
	)
}
