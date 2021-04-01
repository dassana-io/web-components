// import { handleAjaxErrors } from '@dassana-io/web-utils'
import isEmpty from 'lodash/isEmpty'
import { SelectOption } from '../../Select'
import { v4 as uuidV4 } from 'uuid'
import { AxiosInstance, Emitter } from '@dassana-io/web-utils'
import { FiltersList, OnSearchWrapper, ProcessedFilters } from '../types'
import { formatFilterValsToSelectOpts, processFilters } from '../utils'
import {
	mockDynamicFilterOptions,
	mockFilterOptions
} from '../fixtures/0_sample_data'
import { useEffect, useState } from 'react'

export const useFilters = (
	endpoint: string,
	api: AxiosInstance,
	emitter: Emitter
) => {
	const [allFilters, setAllFilters] = useState<ProcessedFilters>({})

	const [dynamicOptions, setDynamicOptions] = useState<
		SelectOption[] | undefined
	>(undefined)

	const [dynamicSearchVal, setDynamicSearchVal] = useState('')

	// filtersList is initialized with an object with just the ID so
	// that when users open the filter popover there is a blank filter
	// and they don't have to manually press the Add Filter button
	const [filtersList, setFiltersList] = useState<FiltersList>([
		{ id: uuidV4() }
	])

	const [loading, setLoading] = useState(true)
	const [pending, setPending] = useState(false)

	// TODO: Delete eslint-disable when API is working
	// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
	const onSearchWrapper: OnSearchWrapper = selectedFilterKey => async (
		searchVal: string
	) => {
		// Uncomment this to test if it's working.
		/* 
    // TODO: Delete and write tests
    console.log({
			filterKey: selectedFilterKey,
			filters: formatSelectedFilters(filtersList),
			search: searchVal
    })
    */

		setDynamicSearchVal(searchVal)

		setPending(true)

		// try {

		// const dataToSend: FilterSuggestions = {
		//   filterKey: selectedFilterKey,
		//   operator: '=',
		//   filters: formatSelectedFilters(filtersList),
		//   search: searchVal
		// }
		// 	const result = await api.post<FilterValues[]>(endpoint, dataToSend)
		//   setDynamicOptions(result.data)
		// } catch (error) {
		// 	handleAjaxErrors(error, emitter)
		// }

		// TODO: Delete and uncomment above lines when API is working
		const setAsyncTimeout = (cb: any, timeout = 0) =>
			new Promise<void>(resolve => {
				setTimeout(() => {
					cb()
					resolve()
				}, timeout)
			})

		await setAsyncTimeout(() => {
			setDynamicOptions(
				formatFilterValsToSelectOpts(mockDynamicFilterOptions)
			)
			setPending(false)
		}, 400)
		// -----------------
	}

	useEffect(() => {
		// const getFilters = async () => {
		// 	try {
		// 		const result = await api.get<FilterOption[]>(endpoint)

		// 		return result.data
		// 	} catch (error) {
		// 		handleAjaxErrors(error, emitter)
		// 	}
		// }

		// TODO: Delete and uncomment above lines when API is working
		const getFilters = () =>
			setAllFilters(processFilters(mockFilterOptions))

		setTimeout(() => {
			getFilters()
		}, 800)
		// -----------------
	}, [api, emitter, endpoint])

	useEffect(() => {
		setLoading(isEmpty(allFilters))
	}, [allFilters])

	return {
		allFilters,
		dynamicOptions,
		dynamicSearchVal,
		filtersList,
		loading,
		onSearchWrapper,
		pending,
		setFiltersList
	}
}
