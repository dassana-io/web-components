import { ClientSideFilters } from './ClientSideFilters'
import { FiltersProps } from './types'
import omit from 'lodash/omit'
import { ServerSideFilters } from './ServerSideFilters'
import React, { FC } from 'react'

export const Filters: FC<FiltersProps> = (props: FiltersProps) =>
	props.mode === 'frontend' ? (
		<ClientSideFilters {...omit(props, 'mode')} />
	) : (
		<ServerSideFilters {...omit(props, 'mode')} />
	)

export * from './types'
