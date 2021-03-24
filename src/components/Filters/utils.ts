// import { handleAjaxErrors } from '@dassana-io/web-utils'
import { SelectOption } from '../Select'
import xor from 'lodash/xor'
import { FilterOptions, Filters, FilterValues } from 'api'
import { FiltersList, ProcessedFilters, SelectedValsFilters } from './types'
// import { FilterSuggestions } from 'api'

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

	return filtersWithSelectedVals.map(filterItem => ({
		key: filterItem.selectedKey,
		operator: filterItem.selectedOperator || '=',
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
