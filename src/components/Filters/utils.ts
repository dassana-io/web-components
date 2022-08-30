// import { handleAjaxErrors } from '@dassana-io/web-utils'
// import { FilterSuggestions } from 'api'
import { SelectOption } from '../Select'
import {
	FilterOptions,
	Filters,
	FiltersList,
	FilterValues,
	ProcessedFilters,
	SelectedValsFilters,
	ServerSideFiltersProps
} from './types'

// Constants

export const filtersPopupWrapperId = 'filters-popup-wrapper'

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-

export const filterSelectedFilters: (
	filtersList: FiltersList
) => SelectedValsFilters = filtersList =>
	filtersList.filter(
		filterItem =>
			filterItem.selectedValues && filterItem.selectedValues.length
	) as SelectedValsFilters

// --------------------------------------

export const formatFilterValsToSelectOpts = (
	options: FilterValues,
	isIcon?: boolean
): SelectOption[] =>
	options.map(({ id, value }) => {
		let optionalProps

		if (isIcon) optionalProps = { iconKey: id }

		return {
			text: value,
			value: id,
			...optionalProps
		}
	})

// --------------------------------------

export const formatFilterStrToSelectOpts = (options: string[]) =>
	options.map(option => ({ text: option, value: option } as SelectOption))

// --------------------------------------

export const formatSelectedFilters: (
	filtersList: FiltersList
) => Filters = filtersList => {
	const filtersWithSelectedVals = filterSelectedFilters(filtersList)

	return filtersWithSelectedVals.map(
		({ selectedKey, selectedOperator = '=', selectedValues = [] }) => ({
			key: selectedKey,
			operator: selectedOperator || '=',
			value: selectedValues?.map(selectedValue => selectedValue.value)
		})
	)
}

// --------------------------------------

export const getFilterKeysOptions = (
	allFilters: ProcessedFilters,
	filtersList: FiltersList
) => {
	// Already selected keys will be hidden from dropdown
	const hiddenKeysArr = filtersList.reduce((acc: string[], curr) => {
		if (curr.selectedKey) {
			return [...acc, curr.selectedKey]
		} else return acc
	}, [])

	return Object.entries(allFilters).map(([filterKeyId, item]) => ({
		hidden: hiddenKeysArr.includes(filterKeyId),
		text: item.key.value,
		value: filterKeyId
	}))
}

// --------------------------------------

type ProcessFilters = (
	filterOptions: FilterOptions,
	omittedFilterKeys?: ServerSideFiltersProps['omittedFilterKeys']
) => ProcessedFilters
export const processFilters: ProcessFilters = (
	filterOptions,
	omittedFilterKeys = []
) => {
	const processedFilters: ProcessedFilters = {}

	filterOptions.forEach(filterOption => {
		const { key, staticFilter, type } = filterOption

		if (!omittedFilterKeys.includes(key.id)) {
			processedFilters[key.id] = {
				...filterOption,
				key,
				staticFilter: staticFilter as unknown as boolean,
				type
			}
		}
	})

	return processedFilters
}
