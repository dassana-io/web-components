import isEmpty from 'lodash/isEmpty'
import { SelectOption } from '../../Select'
import { unstable_batchedUpdates } from 'react-dom'
import { formatFilterValsToSelectOpts, processFilters } from '../utils'
import {
	OnSearchWrapper,
	ProcessedFilters,
	ServerSideFiltersProps
} from '../types'
import { useEffect, useState } from 'react'

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

	const [dynamicOptions, setDynamicOptions] = useState<
		SelectOption[] | undefined
	>(undefined)

	const [dynamicSearchVal, setDynamicSearchVal] = useState('')

	const [loading, setLoading] = useState(true)
	const [pending, setPending] = useState(false)

	// TODO: Delete eslint-disable when API is working
	const onSearchWrapper: OnSearchWrapper =
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
		}

	const resetDynamicProps = () => {
		setDynamicSearchVal('')
		setDynamicOptions(undefined)
		setPending(false)
	}

	useEffect(() => {
		const fetchFilters = async () => {
			try {
				const filterOptions = await onFiltersFetch()

				setAllFilters(processFilters(filterOptions, omittedFilterKeys))
			} catch (error) {
				return []
			}
		}

		fetchFilters()
	}, [omittedFilterKeys, onFiltersFetch])

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
