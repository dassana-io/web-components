import cloneDeep from 'lodash/cloneDeep'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FilterPopover } from './FilterPopover'
import find from 'lodash/find'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { Skeleton } from '../Skeleton'
import startCase from 'lodash/startCase'
import { styleguide } from '../assets/styles'
import truncate from 'lodash/truncate'
import { useBaseFilterStyles } from './styles'
import { useFiltersContext } from './FiltersContext'
import { useShortcut } from '@dassana-io/web-utils'
import { v4 as uuidV4 } from 'uuid'
import { filterSelectedFilters, formatSelectedFilters } from './utils'
import { FiltersList, FiltersListItem } from './types'
import React, { ReactNode, useEffect, useState } from 'react'

const { spacing } = styleguide

const truncateLength = 15

export const BaseFilters = () => {
	const {
		config,
		loading,
		onSelectedFiltersChange,
		resetDynamicProps
	} = useFiltersContext()

	const [filtersList, setFiltersList] = useState<FiltersList>([
		{ id: uuidV4() }
	])

	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	useEffect(() => {
		if (!isPopoverOpen && resetDynamicProps) resetDynamicProps()
	}, [isPopoverOpen, resetDynamicProps])

	const classes = useBaseFilterStyles()

	const closePopover = () => setIsPopoverOpen(false)
	const openPopover = () => setIsPopoverOpen(true)

	const resetFiltersList = () => setFiltersList([])

	const togglePopoverVisibility = (isPopoverOpen: boolean) =>
		setIsPopoverOpen(isPopoverOpen)

	useShortcut({
		callback: closePopover,
		key: 'Escape',
		keyEvent: 'keydown'
	})

	const onClickAddFilter = () =>
		setFiltersList(oldFiltersList => [...oldFiltersList, { id: uuidV4() }])

	// When a FilterUnit is deleted,
	// filter out the filtersListItem by id from filtersList
	// and update state with the filtered items
	const onDelete = (selectedId: string) => {
		const filteredItems = filtersList.filter(item => item.id !== selectedId)

		setFiltersList(filteredItems)
	}

	// When any of the filter items gets updated — operator, key or values,
	// this callback will be called with the id of the updated filtersListItem
	// and the updated filter item(s).
	// E.g. if operator is updated, the cb will be called with:
	// { id: 'some-uuid', selectedOperator: '=' }
	const onFilterChange = ({
		id,
		selectedOperator,
		selectedKey,
		selectedValues
	}: FiltersListItem) => {
		const clonedFilters = cloneDeep(filtersList)

		const selectedItem = find(clonedFilters, filter => filter.id === id)

		if (selectedItem) {
			if (selectedKey) {
				selectedItem.selectedKey = selectedKey
			} else if (selectedOperator) {
				selectedItem.selectedOperator = selectedOperator

				onSelectedFiltersChange(formatSelectedFilters(clonedFilters))
			} else {
				selectedItem.selectedValues = selectedValues

				onSelectedFiltersChange(formatSelectedFilters(clonedFilters))
			}

			setFiltersList(clonedFilters)
		}
	}

	const renderFiltersSummary = () =>
		filterSelectedFilters(filtersList).map(
			({ selectedKey, selectedOperator = '=', selectedValues = [] }) => {
				let values: string[] | ReactNode[]

				const iconConfig = config?.iconConfig

				// If config.iconConfig exists and the filterKey in that config
				// matches the current config, render icons.
				if (iconConfig && iconConfig.filterKey === selectedKey) {
					const iconMap = iconConfig.iconMap

					values = selectedValues.map(({ text, value }) =>
						// If value exists in the iconMap, render the icon.
						// Otherwise render correctly truncated text (to prevent "undefined" from being displayed).
						iconMap[value] ? (
							<Icon
								height={15}
								icon={iconMap[value]}
								key={value}
							/>
						) : (
							truncate(text, { length: truncateLength })
						)
					)
				} else {
					// For everything that is not an icon, render correctly truncated text.
					values = selectedValues.map(({ text }) =>
						truncate(text, { length: truncateLength })
					)
				}

				const keyStr = startCase(selectedKey)

				return (
					<span className={classes.filterReadOnly} key={selectedKey}>
						<span className={classes.bracket}>[</span>
						<span className={classes.filterUnitReadOnly}>
							{keyStr}
							<span className={classes.operator}>
								{selectedOperator}
							</span>
							{values.map(
								(val: string | ReactNode, valIndex: number) => (
									<span
										className={classes.valuesReadOnly}
										key={valIndex}
									>
										{val}
									</span>
								)
							)}
						</span>
						<span className={classes.bracket}>]</span>
					</span>
				)
			}
		)

	const renderFilterControls = () => (
		<div className={classes.filterControls}>
			<IconButton
				classes={[classes.filterIcon]}
				hasBorder
				icon={faFilter}
				onClick={openPopover}
			/>
			<div className={classes.filtersSummary} onClick={openPopover}>
				{renderFiltersSummary()}
			</div>
		</div>
	)

	return (
		<div className={classes.container} id='filters-popup-wrapper'>
			{loading ? (
				<div className={classes.filterControls}>
					<Skeleton height={spacing.xl} width={spacing.xl} />
				</div>
			) : (
				<>
					<FilterPopover
						closePopover={closePopover}
						filtersList={filtersList}
						isPopoverOpen={isPopoverOpen}
						onClickAddFilter={onClickAddFilter}
						onDelete={onDelete}
						onFilterChange={onFilterChange}
						resetFiltersList={resetFiltersList}
						togglePopoverVisibility={togglePopoverVisibility}
					/>
					{renderFilterControls()}
				</>
			)}
		</div>
	)
}
