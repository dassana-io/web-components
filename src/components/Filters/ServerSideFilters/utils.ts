import isEmpty from 'lodash/isEmpty'
import { SelectOption } from '../../Select'
import { unstable_batchedUpdates } from 'react-dom'
import { formatFilterValsToSelectOpts, processFilters } from '../utils'
import {
	OnSearchWrapper,
	ProcessedFilters,
	ServerSideFiltersProps
} from '../types'
import { useCallback, useEffect, useState } from 'react'

type UseFiltersParams = Omit<
	ServerSideFiltersProps,
	'mode' | 'onSelectedFiltersChange'
>

export const useFilters = ({
	onFiltersFetch,
	onFilterSuggest,
	omittedFilterKeys = []
}: UseFiltersParams) => {
	const [allFilters, setAllFilters] = useState<ProcessedFilters>({})
	const [filtersFetched, setFiltersFetched] = useState(false)

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

		if (!filtersFetched) fetchFilters()
	}, [filtersFetched, omittedFilterKeys, onFiltersFetch])

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
