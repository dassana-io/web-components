import { ClientSideFilters } from './ClientSideFilters'
import { ServerSideFilters } from './ServerSideFilters'
import { FiltersMode, type FiltersProps } from './types'
import React, { type FC } from 'react'

export const Filters: FC<FiltersProps> = (props: FiltersProps) =>
	props.mode === FiltersMode.frontend
? (
		<ClientSideFilters {...props} />
	)
: (
		<ServerSideFilters {...props} />
	)

export * from './types'
