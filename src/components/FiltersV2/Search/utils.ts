import Fuse from 'fuse.js'
import { CommonFilterUnitConfig, KeyConfig } from './mockData'
import { FilterStage, FilterUnit } from '../types'

const fuse = (allSuggestions: any[]) =>
	new Fuse(allSuggestions, {
		findAllMatches: true,
		isCaseSensitive: false,
		keys: ['value'],
		shouldSort: true,
		threshold: 0.2
	})

export const getCurrentFilterStageValue = (
	inputStr: string,
	stage: FilterStage,
	filter: Record<FilterStage, KeyConfig | CommonFilterUnitConfig>,
	lengthOffset = 0
): string => {
	const { key, operator, value: filterValue } = filter
	let startIdx = 0
	let length = inputStr.length

	switch (stage) {
		case FilterStage.key: {
			length = key.value.length
			break
		}
		case FilterStage.operator: {
			startIdx = key.value.length + 1

			// If value exists, only pull out operator from entire input string
			if (String(filterValue.value).length) {
				length =
					length -
					String(filterValue.value).length -
					key.value.length -
					2
			}
			break
		}
		case FilterStage.value: {
			startIdx = key.value.length + operator.value.length + 2
			break
		}
	}

	return inputStr.substr(startIdx, length + lengthOffset)
}

export const getFilterStageBasedOnCursorPosition = (
	cursorPos: number,
	filter: Record<FilterStage, KeyConfig | CommonFilterUnitConfig>
): FilterStage => {
	const { key, operator } = filter
	let stage = FilterStage.value

	if (cursorPos < key.value.length) {
		stage = FilterStage.key
	} else if (cursorPos < key.value.length + operator.value.length + 2) {
		// 2 accounts for the number of spaces
		stage = FilterStage.operator
	}

	return stage
}

export const getSuggestions = (searchStr: string, dataSet: any[]) =>
	searchStr
		? fuse(dataSet)
				.search(searchStr)
				.map(({ item }) => item)
		: dataSet

export const getSuggestionValue = (
	suggestions: any[],
	filterStage: FilterStage
) => {
	let val = suggestions[0].value.toLowerCase()

	if (filterStage !== FilterStage.value) {
		val = `${suggestions[0].value.toLowerCase()} `
	}

	return val
}

export const getTrimmedSuggestions = () => {
	// get trimmed
}
