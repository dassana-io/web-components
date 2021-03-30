import { ClientSideFilters } from './ClientSideFilters'
import omit from 'lodash/omit'
import { ServerSideFilters } from './ServerSideFilters'
import { FiltersMode, FiltersProps } from './types'
import React, { FC } from 'react'

export const Filters: FC<FiltersProps> = (props: FiltersProps) =>
	props.mode === FiltersMode.frontend ? (
		<ClientSideFilters {...omit(props, 'mode')} />
	) : (
		<ServerSideFilters {...omit(props, 'mode')} />
	)

export * from './types'
