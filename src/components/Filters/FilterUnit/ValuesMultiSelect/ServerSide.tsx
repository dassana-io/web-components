import { createUseStyles } from 'react-jss'
import find from 'lodash/find'
import { formatFilterValsToSelectOpts } from '../../utils'
import { getMultiSelectProps } from './utils'
import omit from 'lodash/omit'
import uniqBy from 'lodash/uniqBy'
import { useFiltersContext } from '../../FiltersContext'
import { type ValuesMultiSelectProps } from './types'
import { MultiSelect, type SelectOption } from '../../../Select'
import React, { type FC, useCallback, useEffect, useState } from 'react'

const useStyles = createUseStyles({
	hiddenOpts: { display: 'none' }
})

interface Props extends ValuesMultiSelectProps {
	containerClasses?: string[]
	staticFilter?: boolean
}

export const ServerSideValuesMS: FC<Props> = ({
	containerClasses = [],
	id,
	onFilterChange,
	filterOptValues = [],
	selectedKey,
	optionsConfig,
	selectedValues = [],
	staticFilter,
	windowWidth
}: Props) => {
	const {
		dynamicOptions,
		dynamicSearchVal,
		onSearchWrapper,
		pending,
		resetDynamicProps
	} = useFiltersContext()

	const classes = useStyles()
	const [options, setOptions] = useState<SelectOption[]>(selectedValues)

	useEffect(() => {
		if (selectedKey && filterOptValues) {
			// if filter is static, options will be the opts that BE initially gave
			if (staticFilter) {
				const formattedOpts = formatFilterValsToSelectOpts(
					filterOptValues,
					!!optionsConfig
				)

				setOptions(
					uniqBy([...selectedValues, ...formattedOpts], 'value').map(
						option => omit(option, 'classes')
					)
				)
			} else {
				// if filter is dynamic & state is pending, data is still being fetched. So only get options if status isn't pending
				if (!pending) {
					// if dynamic opts don't exist, options will be same as for static with the opts that BE initially gave
					if (!dynamicOptions) {
						const formattedOpts = formatFilterValsToSelectOpts(
							filterOptValues,
							!!optionsConfig
						)

						setOptions(
							uniqBy(
								[...selectedValues, ...formattedOpts],
								'value'
							).map(option => omit(option, 'classes'))
						)
					} else {
						// if you send empty string to BE (e.g. after typing something and clearing it), it'll send back an empty [] but if there's no search val, we want to display the list of options that BE initially gave so only show the dynamic opts if search val exists
						if (dynamicSearchVal) {
							const allOpts = uniqBy(
								[...selectedValues, ...dynamicOptions],
								'value'
							)

							setOptions(
								allOpts.map(item =>
									find(dynamicOptions, omit(item, 'classes'))
										? item
										: {
												...item,
												classes: [classes.hiddenOpts]
											}
								)
							)
						}

						// if there is no search val but dynamic options exist - along with options that BE initially gave, make sure to add the selected values(if they exist)
						else {
							const formattedOpts = uniqBy(
								[
									...formatFilterValsToSelectOpts(
										[...filterOptValues],
										!!optionsConfig
									),
									...dynamicOptions,
									...selectedValues
								],
								'value'
							)

							setOptions(
								uniqBy(
									[...selectedValues, ...formattedOpts].map(
										option => omit(option, 'classes')
									),
									'value'
								)
							)
						}
					}
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		dynamicOptions,
		dynamicSearchVal,
		onSearchWrapper,
		optionsConfig,
		pending,
		selectedKey
	])

	const onDropdownOpen = useCallback(() => {
		if (!staticFilter && selectedKey && onSearchWrapper) {
			onSearchWrapper(selectedKey)!('')
		}
	}, [onSearchWrapper, selectedKey, staticFilter])

	return (
		<MultiSelect
			{...getMultiSelectProps({
				id,
				multiSelectProps: {
					onDropdownClose: resetDynamicProps,
					onDropdownOpen,
					onSearch:
						onSearchWrapper && selectedKey
							? onSearchWrapper(selectedKey)
							: undefined,
					options,
					optionsConfig,
					pending,
					searchPlaceholder: 'Search...',
					showSearch: !staticFilter
				},
				onFilterChange,
				selectedValues,
				windowWidth
			})}
			containerClasses={containerClasses}
			disabled={!selectedKey} // TODO: look into this
			fullWidth
		/>
	)
}
