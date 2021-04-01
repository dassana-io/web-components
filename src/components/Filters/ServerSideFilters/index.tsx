import { BaseFilters } from '../BaseFilters'
import { FiltersCtxProvider } from '../FiltersContext'
import { useFilters } from './utils'
import { FiltersMode, ServerSideFiltersProps } from '../types'
import React, { FC } from 'react'

type ServerSide = Omit<ServerSideFiltersProps, 'mode'>

export const ServerSideFilters: FC<ServerSide> = ({
	api,
	config,
	emitter,
	endpoint,
	onSelectedFiltersChange
}: ServerSide) => {
	// useFilters is where all the related data will be held.
	// API calls will also be handled in useFilters.
	const filterMethods = useFilters(endpoint, api, emitter)

	return (
		<FiltersCtxProvider
			value={{
				config,
				onSelectedFiltersChange,
				...filterMethods
			}}
		>
			<BaseFilters mode={FiltersMode.backend} />
		</FiltersCtxProvider>
	)
}
