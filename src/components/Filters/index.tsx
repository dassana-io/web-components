import { ClientSideFilters } from './ClientSideFilters'
import FiltersSummary from './FiltersSummary'
import { processFilters } from './utils'
import { ServerSideFilters } from './ServerSideFilters'
import { FiltersMode, type FiltersProps } from './types'
import React, { type FC } from 'react'

export const Filters: FC<FiltersProps> = (props: FiltersProps) =>
	props.mode === FiltersMode.frontend ? (
		<ClientSideFilters {...props} />
	) : (
		<ServerSideFilters {...props} />
	)

export { FiltersSummary, processFilters }
export * from './types'
