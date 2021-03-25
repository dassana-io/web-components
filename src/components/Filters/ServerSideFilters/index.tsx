import { BaseFilters } from '../BaseFilters'
import { FiltersCtxProvider } from '../FiltersContext'
import { ServerSideFiltersProps } from '../types'
import { useFilters } from './utils'
import React, { FC } from 'react'

type ServerSide = Omit<ServerSideFiltersProps, 'mode'>

export const ServerSideFilters: FC<ServerSide> = ({
	api,
	config,
	emitter,
	endpoint,
	onSelectedFiltersChange
}: ServerSide) => {
	const {
		allFilters,
		dynamicOptions,
		dynamicSearchVal,
		filtersList,
		loading,
		onSearchWrapper,
		pending,
		setFiltersList
	} = useFilters(endpoint, api, emitter)

	return (
		<FiltersCtxProvider
			value={{
				allFilters,
				config,
				dynamicOptions,
				dynamicSearchVal,
				filtersList,
				loading,
				onSearchWrapper,
				onSelectedFiltersChange,
				pending,
				setFiltersList
			}}
		>
			<BaseFilters mode='backend' />
		</FiltersCtxProvider>
	)
}
