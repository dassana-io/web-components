// import { handleAjaxErrors } from '@dassana-io/web-utils'
import isEmpty from 'lodash/isEmpty'
import { SelectOption } from 'components/Select'
import startCase from 'lodash/startCase'
import truncate from 'lodash/truncate'
import { v4 as uuidV4 } from 'uuid'
import xor from 'lodash/xor'
import { AxiosInstance, Emitter } from '@dassana-io/web-utils'
import { FilterOptions, Filters, FilterValues } from 'api'
import {
	FiltersList,
	OnSearchWrapper,
	ProcessedFilters,
	SelectedValsFilters
} from './types'
import {
	mockDynamicFilterOptions,
	mockFilterOptions
} from './fixtures/0_sample_data'
import { useEffect, useState } from 'react'
// import { FilterSuggestions } from 'api'

const filterSelectedFilters: (
	filtersList: FiltersList
) => SelectedValsFilters = filtersList =>
	filtersList.filter(
		filterItem =>
			filterItem.selectedValues && filterItem.selectedValues.length
	) as SelectedValsFilters

// --------------------------------------

export const filtersListToString = (filtersList: FiltersList) => {
	const filtersWithSelectedVals = filterSelectedFilters(filtersList)

	const formattedFilters = filtersWithSelectedVals.map(
		({ selectedKey, selectedValues = [] }) => {
			const keyStr = startCase(selectedKey)

			const valuesStr = selectedValues
				.map(val => truncate(val.text, { length: 15 }))
				.join(', ')

			return `[ ${keyStr} = ${valuesStr} ]`
		}
	)

	return formattedFilters.join(' + ')
}

// --------------------------------------

const formatDynamicOptions = (dynamicOptions: FilterValues): SelectOption[] =>
	dynamicOptions.map(option => ({ text: option.value, value: option.id }))

// --------------------------------------

export const formatFilterOptions = (options: FilterValues): SelectOption[] =>
	options.map(({ id, value }) => ({ text: value, value: id }))

// --------------------------------------

export const formatFilterKeyOptions = (options: string[]) =>
	options.map(option => ({ text: option, value: option } as SelectOption))

// --------------------------------------

export const formatSelectedFilters: (
	filtersList: FiltersList
) => Filters = filtersList => {
	const filtersWithSelectedVals = filterSelectedFilters(filtersList)

	return filtersWithSelectedVals.map(filterItem => ({
		key: filterItem.selectedKey,
		value: filterItem.selectedValues?.map(
			selectedValue => selectedValue.value
		)
	}))
}

// --------------------------------------

export const getFilterKeysOptions = (
	allFilters: ProcessedFilters,
	filtersList: FiltersList
) => {
	const unavailableKeysArr = filtersList.reduce((acc: string[], curr) => {
		if (curr.selectedKey) {
			return [...acc, curr.selectedKey]
		} else return acc
	}, [])

	const allKeysArr = Object.keys(allFilters)

	return xor(unavailableKeysArr, allKeysArr)
}

// --------------------------------------

export const processFilters = (filterOptions: FilterOptions) => {
	const processedFilters: ProcessedFilters = {}

	filterOptions.forEach(filterOption => {
		const { key, staticFilter } = filterOption

		processedFilters[(key as unknown) as string] = {
			...filterOption,
			key: (key as unknown) as string,
			staticFilter: (staticFilter as unknown) as boolean
		}
	})

	return processedFilters
}

// --------------------------------------

export interface DynamicOption {
	id: string
	name: string
}

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
			setDynamicOptions(formatDynamicOptions(mockDynamicFilterOptions))
			setPending(false)
		}, 0)
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
