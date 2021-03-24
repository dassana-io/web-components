import { BaseFilters } from '../BaseFilters'
import { ServerSideFiltersProps } from '../types'
import { useFilters } from './utils'
import React, { FC } from 'react'

type ServerSide = Omit<ServerSideFiltersProps, 'type'>

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
		<BaseFilters
			allFilters={allFilters}
			config={config}
			dynamicOptions={dynamicOptions}
			dynamicSearchVal={dynamicSearchVal}
			filtersList={filtersList}
			loading={loading}
			onSearchWrapper={onSearchWrapper}
			onSelectedFiltersChange={onSelectedFiltersChange}
			pending={pending}
			setFiltersList={setFiltersList}
			type='backend'
		/>
	)
}
