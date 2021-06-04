import { BaseFilters } from '../BaseFilters'
import { FiltersCtxProvider } from '../FiltersContext'
import { ServerSideFiltersProps } from '../types'
import { useFilters } from './utils'
import React, { FC } from 'react'

export const ServerSideFilters: FC<ServerSideFiltersProps> = ({
	api,
	emitter,
	endpoint,
	filtersRef,
	omittedFilterKeys = [],
	...rest
}: ServerSideFiltersProps) => {
	// useFilters is where all the related data will be held.
	// API calls will also be handled in useFilters.
	const filterMethods = useFilters({
		api,
		emitter,
		endpoint,
		omittedFilterKeys
	})

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
