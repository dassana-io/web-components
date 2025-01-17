import isEmpty from 'lodash/isEmpty'
import { type SelectOption } from '../../Select'
import { unstable_batchedUpdates } from 'react-dom'
import { formatFilterValsToSelectOpts, processFilters } from '../utils'
import {
	type OnSearchWrapper,
	type ProcessedFilters,
	type ServerSideFiltersProps
} from '../types'
import { useCallback, useEffect, useState } from 'react'

type UseFiltersParams = Omit<
	ServerSideFiltersProps,
	'mode' | 'onSelectedFiltersChange'
>

export const useFilters = ({
	filterOptions,
	onFiltersFetch,
	onFilterSuggest,
	omittedFilterKeys = []
}: UseFiltersParams) => {
	const [allFilters, setAllFilters] = useState<ProcessedFilters>({})
	const [filtersFetched, setFiltersFetched] = useState(false)
	const [filterFetchInitiated, setFilterFetchInitiated] =
		useState(!!filterOptions)

	const [dynamicOptions, setDynamicOptions] = useState<
		SelectOption[] | undefined
	>(undefined)

	const [dynamicSearchVal, setDynamicSearchVal] = useState('')

	const [loading, setLoading] = useState(true)
	const [pending, setPending] = useState(false)

	const onSearchWrapper: OnSearchWrapper = useCallback(
		selectedFilterKey => async (searchVal: string) => {
			unstable_batchedUpdates(() => {
				setDynamicSearchVal(searchVal)
				setPending(true)
			})

			const dynamicOptions = await onFilterSuggest(
				selectedFilterKey,
				searchVal
			)

			unstable_batchedUpdates(() => {
				setDynamicOptions(formatFilterValsToSelectOpts(dynamicOptions))
				setPending(false)
			})
		},
		[onFilterSuggest]
	)

	const resetDynamicProps = () => {
		setDynamicSearchVal('')
		setDynamicOptions(undefined)
		setPending(false)
	}

	useEffect(() => {
		const fetchFilters = async () => {
			try {
				setFilterFetchInitiated(true)

				const filterOptions = await onFiltersFetch()

				unstable_batchedUpdates(() => {
					setFiltersFetched(true)
					setAllFilters(
						processFilters(filterOptions, omittedFilterKeys)
					)
				})
			} catch (error) {
				return []
			}
		}

		if (!filtersFetched && !filterFetchInitiated) fetchFilters()
	}, [
		filterFetchInitiated,
		filtersFetched,
		omittedFilterKeys,
		onFiltersFetch
	])

	useEffect(() => {
		if (filterOptions && isEmpty(allFilters)) {
			setAllFilters(processFilters(filterOptions, omittedFilterKeys))
		}
	}, [allFilters, filterOptions, omittedFilterKeys])

	useEffect(() => {
		return () => setAllFilters({})
	}, [])

	useEffect(() => {
		setLoading(isEmpty(allFilters))

		return () => {
			setLoading(true)
		}
	}, [allFilters])

	return {
		allFilters,
		dynamicOptions,
		dynamicSearchVal,
		loading,
		onSearchWrapper,
		pending,
		resetDynamicProps
	}
}
