import { Dropdown } from './Dropdown'
import { FilterStage } from '../types'
import omit from 'lodash/omit'
import { ShortcutMicrocopy } from 'components/ShortcutMicrocopy'
import { unstable_batchedUpdates } from 'react-dom'
import { useFiltersContext } from '../FiltersContext'
import { useSearchStyles } from '../styles'
import { AntDInputType, Input } from 'components/Input'
import {
	CommonFilterUnitConfig,
	KeyConfig,
	Keys,
	OperatorTypes,
	sampleKeys,
	sampleOperatorMap,
	sampleValuesMap
} from './mockData'
import {
	getCurrentFilterStageValue,
	getFilterStageBasedOnCursorPosition,
	getSuggestions,
	getSuggestionValue
} from './utils'
import React, {
	ChangeEvent,
	FC,
	RefObject,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import {
	useClickOutside,
	usePrevious,
	useShortcut
} from '@dassana-io/web-utils'

const { key, operator, value } = FilterStage

const filterOrder = Object.values(FilterStage)

interface FiltersMap {
	[key]: KeyConfig
	[operator]: CommonFilterUnitConfig
	[value]: CommonFilterUnitConfig
}

const defaultFilter: FiltersMap = {
	[key]: { key: '', type: OperatorTypes.string, value: '' },
	[operator]: { key: '', value: '' },
	[value]: { key: '', value: '' }
}

interface SuggestionsMap {
	[key]: KeyConfig[]
	[operator]: CommonFilterUnitConfig[]
	[value]: CommonFilterUnitConfig[]
}

const defaultSuggestionsMap: SuggestionsMap = {
	[key]: [],
	[operator]: [],
	[value]: []
}

interface SearchProps {
	inputRef: RefObject<AntDInputType>
}

export const Search: FC<SearchProps> = ({ inputRef }: SearchProps) => {
	const timerRef = useRef<NodeJS.Timeout>()
	const {
		addFilterToGroup,
		currentFilterId,
		filtersMap,
		setCurrentFilter,
		updateFilter
	} = useFiltersContext()
	const prevFilterId = usePrevious(currentFilterId)

	const [inputValue, setInputValue] = useState('')
	const [currentFilterStage, setCurrentFilterStage] = useState(
		FilterStage.key
	)
	const [allSuggestions, setAllSuggestions] = useState(defaultSuggestionsMap)
	const [filteredSuggestions, setFilteredSuggestions] =
		useState<any[]>(sampleKeys)
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const containerRef = useClickOutside({
		callback: () => setDropdownIsOpen(false)
	})
	const [filter, setFilter] = useState(defaultFilter)
	const [filterComplete, setFilterComplete] = useState(false)

	const classes = useSearchStyles()

	const getCurrentInputData = (
		newInputValue: string,
		cursorPosition = 0,
		match = false,
		e?: ChangeEvent<HTMLInputElement>
	) => {
		let complete = false
		let searchVal = newInputValue
		let suggestions: any[] = []
		let nextFilterStage = currentFilterStage
		let inputVal = newInputValue
		let updatedFilter = filter

		const userPressedBackspace = newInputValue.length < inputValue.length

		if (userPressedBackspace) {
			nextFilterStage = getFilterStageBasedOnCursorPosition(
				cursorPosition,
				filter
			)
		}

		switch (nextFilterStage) {
			case FilterStage.key: {
				if (userPressedBackspace) {
					inputVal = getCurrentFilterStageValue(
						newInputValue,
						FilterStage.key,
						filter,
						newInputValue.length - inputValue.length
					)
					searchVal = inputVal

					updatedFilter = {
						...updatedFilter,
						operator: defaultFilter.operator,
						value: defaultFilter.value
					}
				}

				break
			}
			case FilterStage.operator: {
				searchVal = getCurrentFilterStageValue(
					newInputValue,
					FilterStage.operator,
					filter
				)

				break
			}
			case FilterStage.value: {
				searchVal = getCurrentFilterStageValue(
					newInputValue,
					FilterStage.value,
					filter
				)
				// Values don't necessarily come with suggestions, so show Microcopy to add filter if at least
				// one character is present
				if (searchVal.trim().length > 0) complete = true

				break
			}
		}

		suggestions = getSuggestions(searchVal, allSuggestions[nextFilterStage])

		updatedFilter = {
			...updatedFilter,
			[nextFilterStage]: {
				...updatedFilter[nextFilterStage],
				value: searchVal.trim()
			}
		}

		if (searchVal.endsWith(' ')) {
			const trimmedSuggestions = getSuggestions(
				searchVal.trim(),
				allSuggestions[currentFilterStage]
			)

			if (
				!match &&
				trimmedSuggestions.length > 1 &&
				trimmedSuggestions.findIndex(
					suggestion =>
						suggestion.value.toLowerCase() === searchVal.trim()
				) > -1
			) {
				timerRef.current = setTimeout(() => {
					e && onInputChange(e, true)

					if (timerRef.current) {
						clearTimeout(timerRef.current)
					}
				}, 500)
			}
		}

		if (
			match ||
			(suggestions.length === 1 &&
				getSuggestionValue(suggestions, currentFilterStage) ===
					searchVal)
		) {
			if (match) {
				searchVal = searchVal.trim()

				// TODO: fix this
				updatedFilter = {
					...updatedFilter,
					[currentFilterStage]: {
						...updatedFilter[currentFilterStage],
						value: searchVal.trim()
					}
				}
			} else {
				updatedFilter = {
					...updatedFilter,
					[currentFilterStage]: suggestions[0]
				}
			}

			if (currentFilterStage !== FilterStage.value) {
				nextFilterStage =
					filterOrder[filterOrder.indexOf(currentFilterStage) + 1]
			} else {
				complete = true
			}

			if (nextFilterStage !== FilterStage.key) {
				suggestions = allSuggestions[nextFilterStage]
			}
		}

		return {
			inputVal,
			isFilterComplete: complete,
			nextFilterStage,
			suggestions,
			updatedFilter
		}
	}

	const resetSearchbar = useCallback(
		() =>
			unstable_batchedUpdates(() => {
				setCurrentFilter('')
				setCurrentFilterStage(FilterStage.key)
				setFilter(defaultFilter)
				setFilterComplete(false)
				setInputValue('')
			}),
		[setCurrentFilter]
	)

	const onInputChange = (e: ChangeEvent<HTMLInputElement>, match = false) => {
		const newInputVal = e.target.value
		const cursorPos = e.target.selectionStart || 0

		// If there is a current filter selected and user clears the input, reset the searchbar
		// to start from scratch
		if (currentFilterId && !newInputVal) {
			resetSearchbar()

			return
		}

		if (timerRef.current) {
			clearTimeout(timerRef.current)

			timerRef.current = undefined
		}

		const {
			isFilterComplete,
			inputVal,
			nextFilterStage,
			suggestions,
			updatedFilter
		} = getCurrentInputData(newInputVal, cursorPos, match, e)

		unstable_batchedUpdates(() => {
			setInputValue(inputVal)
			setFilteredSuggestions(suggestions)
			setFilterComplete(isFilterComplete)

			setFilter(prevFilter => ({
				...prevFilter,
				...updatedFilter
			}))

			if (nextFilterStage !== currentFilterStage) {
				setCurrentFilterStage(nextFilterStage)
			}
		})
	}

	const onDropdownItemClick = (val: CommonFilterUnitConfig | KeyConfig) => {
		const newFilter = {
			...filter,
			[currentFilterStage]: val
		}

		const inputStr =
			`${newFilter.key.value} ${newFilter.operator.value} ${newFilter.value.value}`.replace(
				/\s+/g,
				' '
			)

		const { isFilterComplete, nextFilterStage, suggestions } =
			getCurrentInputData(inputStr, inputStr.length, true)

		unstable_batchedUpdates(() => {
			setFilter(newFilter)
			setInputValue(inputStr)

			setFilteredSuggestions(suggestions)

			if (isFilterComplete && currentFilterStage === FilterStage.value) {
				// If user chooses a filter value from the dropdown, automatically add it to filter group
				setTimeout(() => {
					onFilterAdd(newFilter)
				}, 250)
			} else {
				setFilterComplete(isFilterComplete)
			}

			if (suggestions && suggestions.length) {
				setDropdownIsOpen(true)
			}

			if (nextFilterStage !== currentFilterStage) {
				setCurrentFilterStage(nextFilterStage)
			}
		})
	}

	const onFilterAdd = useCallback(
		(filterMap?: FiltersMap) => {
			const filterToAdd = filterMap ? filterMap : filter

			currentFilterId
				? updateFilter(currentFilterId, filterToAdd)
				: addFilterToGroup(filterToAdd)

			resetSearchbar()
		},
		[
			addFilterToGroup,
			currentFilterId,
			filter,
			resetSearchbar,
			updateFilter
		]
	)

	useEffect(() => {
		// On mount, fetch key suggestions
		// TODO: When BE API is available, also fetch operatorMap and save it in state
		setAllSuggestions({
			key: sampleKeys,
			operator: [],
			value: []
		})
	}, [])

	useEffect(() => {
		// On selection of key, get operator suggestions based in key type
		setAllSuggestions(suggestions => ({
			...suggestions,
			operator: sampleOperatorMap[filter.key.type]
		}))
	}, [filter.key.type])

	useEffect(() => {
		// On selection of operator, fetch values selection
		// TODO: Consider adding loader to dropdown menu when values are being loaded
		setAllSuggestions(suggestions => ({
			...suggestions,
			value: sampleValuesMap[filter.key.key as Keys]
		}))
	}, [filter.key.key, filter.operator.key])

	useEffect(() => {
		if (
			currentFilterId &&
			(!inputValue || currentFilterId !== prevFilterId)
		) {
			const filter = omit(
				filtersMap[currentFilterId],
				'groupId'
			) as FiltersMap
			const { key, operator, value } = filter

			unstable_batchedUpdates(() => {
				setInputValue(`${key.value} ${operator.value} ${value.value}`)
				setFilter(filter)
				setFilterComplete(false)
				setDropdownIsOpen(false)
			})
		}

		if (!currentFilterId && prevFilterId) {
			resetSearchbar()
		}
	}, [currentFilterId, filtersMap, inputValue, prevFilterId, resetSearchbar])

	useShortcut({
		additionalConditionalFn: () => filterComplete,
		callback: onFilterAdd,
		key: 'Enter',
		keyEvent: 'keydown'
	})
	console.log('rerendering search')
	return (
		<div className={classes.container} ref={containerRef}>
			<div className={classes.inputContainer}>
				<Input
					inputRef={inputRef}
					onChange={onInputChange}
					onFocus={() => setDropdownIsOpen(true)}
					value={inputValue}
				/>
				{!filterComplete && inputValue.length > 0 && dropdownIsOpen && (
					<div className={classes.dropdownContainer}>
						<Dropdown
							onDropdownItemClick={onDropdownItemClick}
							suggestions={filteredSuggestions}
						/>
					</div>
				)}
			</div>
			{filterComplete && <ShortcutMicrocopy />}
		</div>
	)
}
