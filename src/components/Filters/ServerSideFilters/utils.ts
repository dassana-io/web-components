// import { handleAjaxErrors } from '@dassana-io/web-utils'
import isEmpty from 'lodash/isEmpty'
import { SelectOption } from '../../Select'
import { AxiosInstance, Emitter } from '@dassana-io/web-utils'
import { formatFilterValsToSelectOpts, processFilters } from '../utils'
import {
	mockDynamicFilterOptions,
	mockFilterOptions
} from '../fixtures/0_sample_data'
import {
	OnSearchWrapper,
	ProcessedFilters,
	ServerSideFiltersProps
} from '../types'
import { useEffect, useState } from 'react'

interface UseFiltersParams
	extends Pick<ServerSideFiltersProps, 'omittedFilterKeys'> {
	api: AxiosInstance
	emitter: Emitter
	endpoint: string
}

export const useFilters = ({
	api,
	emitter,
	endpoint,
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

	const resetDynamicProps = () => {
		setDynamicSearchVal('')
		setDynamicOptions(undefined)
		setPending(false)
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
			setAllFilters(processFilters(mockFilterOptions, omittedFilterKeys))

		setTimeout(() => {
			getFilters()
		}, 800)
		// -----------------

		return () => {
			setAllFilters({})
		}
	}, [api, emitter, endpoint, omittedFilterKeys])

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
