import { BaseFilters } from '../BaseFilters'
import { ClientSideFiltersProps } from '../types'
import { FiltersCtxProvider } from '../FiltersContext'
import { processFilters } from '../utils'
import React, { FC } from 'react'

export const ClientSideFilters: FC<ClientSideFiltersProps> = ({
	filterOptions = [],
	...rest
}: ClientSideFiltersProps) => {
	return (
		<FiltersCtxProvider
			value={{
				allFilters: processFilters(filterOptions),
				...rest
			}}
		>
			<BaseFilters />
		</FiltersCtxProvider>
	)
}
