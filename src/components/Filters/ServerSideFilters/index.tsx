import { BaseFilters } from '../BaseFilters'
import { FiltersCtxProvider } from '../FiltersContext'
import { ServerSideFiltersProps } from '../types'
import { useFilters } from './utils'
import React, { FC } from 'react'

export const ServerSideFilters: FC<ServerSideFiltersProps> = ({
	api,
	emitter,
	endpoint,
	...rest
}: ServerSideFiltersProps) => {
	// useFilters is where all the related data will be held.
	// API calls will also be handled in useFilters.
	const filterMethods = useFilters(endpoint, api, emitter)

	return (
		<FiltersCtxProvider
			value={{
				...filterMethods,
				...rest
			}}
		>
			<BaseFilters />
		</FiltersCtxProvider>
	)
}
