import { ClientSideFilters } from './ClientSideFilters'
import { FiltersProps } from './types'
import omit from 'lodash/omit'
import { ServerSideFilters } from './ServerSideFilters'
import React, { FC } from 'react'

export const Filters: FC<FiltersProps> = (props: FiltersProps) =>
	props.type === 'frontend' ? (
		<ClientSideFilters {...omit(props, 'type')} />
	) : (
		<ServerSideFilters {...omit(props, 'type')} />
	)

export * from './types'
