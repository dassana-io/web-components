import { createUseStyles } from 'react-jss'
// import { handleAjaxErrors } from '@dassana-io/web-utils'
import isEmpty from 'lodash/isEmpty'
import { SelectOption } from 'components/Select'
import startCase from 'lodash/startCase'
import truncate from 'lodash/truncate'
import { v4 as uuidV4 } from 'uuid'
import xor from 'lodash/xor'
import { AxiosInstance, Emitter } from '@dassana-io/web-utils'
import {
	Filter,
	FilterOptions,
	FiltersList,
	OnSearchWrapper,
	ProcessedFilters,
	SelectedValsFilters
} from './types'
import { mockDynamicFilterOptions, mockFilterOptions } from '__mocks__'
import { styleguide, ThemeType } from 'components/assets/styles'
import { useEffect, useState } from 'react'

const {
	borderRadius,
	colors: { blacks, grays },
	flexAlignCenter,
	font,
	fontWeight,
	spacing
} = styleguide

const { dark, light } = ThemeType

const filterSelectedFilters: (
	filtersList: FiltersList
) => SelectedValsFilters = filtersList =>
	filtersList.filter(
		filterItem =>
			filterItem.selectedValues && filterItem.selectedValues.length
	) as SelectedValsFilters

export const filtersListToString = (filtersList: FiltersList) => {
	const filtersWithSelectedVals = filterSelectedFilters(filtersList)

	const formattedFilters = filtersWithSelectedVals.map(
		({ selectedKey, selectedValues = [] }) => {
			const keyStr = startCase(selectedKey)

			const valuesStr = selectedValues
				.map(val => truncate(val, { length: 15 }))
				.join(', ')

			return `[ ${keyStr} = ${valuesStr} ]`
		}
	)

	return formattedFilters.join(' + ')
}

const formatDynamicOptions = (dynamicOptions: DynamicOption[]) =>
	dynamicOptions.map(
		option => ({ text: option.name, value: option.name } as SelectOption)
	)

export const formatFilterOptions = (options: string[]) =>
	options.map(option => ({ text: option, value: option } as SelectOption))

export const formatSelectedFilters: (
	filtersList: FiltersList
) => Filter[] = filtersList => {
	const filtersWithSelectedVals = filterSelectedFilters(filtersList)

	const formattedFilters: Filter[] = []

	filtersWithSelectedVals.forEach(filterItem => {
		filterItem.selectedValues.forEach(val => {
			formattedFilters.push({
				key: filterItem.selectedKey,
				value: val
			})
		})
	})

	return formattedFilters
}

// --------------------------------------

const filterPalette = {
	[dark]: {
		container: {
			background: blacks['darken-40'],
			borderColor: blacks['darken-40']
		}
	},
	[light]: {
		container: {
			background: grays.base,
			borderColor: grays.base
		}
	}
}

const generateThemedFilterContainerStyles = (themeType: ThemeType) => {
	const {
		container: { background, borderColor }
	} = filterPalette[themeType]

	return { background, borderColor }
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

export const processFilters = (filterOptions: FilterOptions) => {
	const processedFilters: ProcessedFilters = {}

	filterOptions.forEach(filterOption => {
		const { filterKey, staticFilter } = filterOption

		processedFilters[(filterKey as unknown) as string] = {
			...filterOption,
			filterKey: (filterKey as unknown) as string,
			staticFilter: (staticFilter as unknown) as boolean
		}
	})

	return processedFilters
}

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
		// 	const result = await api.post<DynamicOption[]>(endpoint, {
		// 		filterKey: selectedFilterKey,
		// 		filters: formatSelectedFilters(filtersList),
		// 		search: searchVal,
		// 	})

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

// --------------------------------------

const filterItemPadding = 3 * spacing.xs

export const useFilterUnitStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		...generateThemedFilterContainerStyles(light),
		border: '1px solid',
		borderRadius,
		marginBottom: spacing.s,
		marginRight: spacing.s,
		padding: `${spacing.xs}px ${filterItemPadding}px ${spacing.xs}px ${spacing.xs}px`
	},
	multiSelectContainer: {
		paddingLeft: filterItemPadding,
		paddingRight: filterItemPadding
	},
	singleSelectContainer: {
		paddingRight: filterItemPadding
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateThemedFilterContainerStyles(dark)
		}
	}
})

// --------------------------------------

export const useFilterStyles = createUseStyles({
	container: {
		width: '100%'
	},
	filterControls: {
		...flexAlignCenter,
		paddingTop: spacing.s
	},
	filterIcon: {
		...font.label,
		marginRight: spacing.l
	},
	selectedFiltersText: {
		cursor: 'pointer',
		fontStyle: 'italic',
		fontWeight: fontWeight.light
	}
})

export const usePopoverStyles = createUseStyles({
	closeButton: {
		position: 'absolute',
		right: 13,
		top: 10
	},
	filtersList: {
		display: 'flex',
		flexWrap: 'wrap',
		paddingTop: spacing.m
	},
	popover: {
		position: 'relative',
		width: `calc(100% - ${2 * spacing.l}px)`
	},
	popoverContent: {
		padding: spacing.l,
		paddingBottom: spacing.m,
		position: 'relative'
	},
	popoverControls: flexAlignCenter,
	popoverControlsChild: { marginRight: spacing.m },
	popoverTrigger: {
		position: 'absolute',
		top: spacing.xs / 2
	}
})
