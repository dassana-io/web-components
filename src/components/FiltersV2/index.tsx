import { AntDInputType } from 'components/Input'
import { FilterRenderer } from './FilterRenderer'
import { Filters } from './types'
import { FiltersCtxProvider } from './FiltersContext'
import { processFilters } from './utils'
import { Search } from './Search'
import { useFilters } from './useFilters'
import React, { FC, useRef } from 'react'

// const mockFilter = {
// 	key: 'brand',
// 	operator: '=',
// 	value: 'allbirds'
// }

// const mockFilterGroup: FilterGroupType = {
// 	coordinator: FilterCoordinators.and,
// 	filters: [{ key: 'brand', operator: '=', value: 'allbirds' }],
// 	subgroups: [
// 		{
// 			coordinator: FilterCoordinators.or,
// 			filters: [
// 				{ key: 'color', operator: '=', value: 'black' },
// 				{ key: 'color', operator: '=', value: 'grey' }
// 			]
// 		}
// 	]
// }

// const mockFilters: Filters = {
// 	filterGroups: [
// 		{
// 			coordinator: FilterCoordinators.and,
// 			filters: [{ key: 'brand', operator: '=', value: 'allbirds' }],
// 			subgroups: [
// 				{
// 					coordinator: FilterCoordinators.or,
// 					filters: [
// 						{ key: 'color', operator: '=', value: 'black' },
// 						{ key: 'color', operator: '=', value: 'grey' }
// 					]
// 				}
// 			]
// 		}
// 	]
// }

export interface FiltersV2Props {
	filterConfig?: Filters
}

export const FiltersV2: FC<FiltersV2Props> = ({
	filterConfig = {} as Filters
}: FiltersV2Props) => {
	const inputRef = useRef<AntDInputType>(null)
	const filterProps = useFilters(processFilters(filterConfig), inputRef)

	return (
		<FiltersCtxProvider value={filterProps}>
			<div>
				<Search inputRef={inputRef} />
				<FilterRenderer />
			</div>
		</FiltersCtxProvider>
	)
}
