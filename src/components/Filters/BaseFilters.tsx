import cloneDeep from 'lodash/cloneDeep'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FilterPopover } from './FilterPopover'
import FiltersSummary from './FiltersSummary'
import find from 'lodash/find'
import { IconButton } from '../IconButton'
import isEqual from 'lodash/isEqual'
import { Skeleton } from '../Skeleton'
import { styleguide } from '../assets/styles'
import { useBaseFilterStyles } from './styles'
import { useFiltersContext } from './FiltersContext'
import { useShortcut } from '@dassana-io/web-utils'
import { v4 as uuidV4 } from 'uuid'
import { FiltersList, FiltersListItem, FiltersProps } from './types'
import { filtersPopupWrapperId, formatSelectedFilters } from './utils'
import React, { FC, useEffect, useImperativeHandle, useState } from 'react'

const { spacing } = styleguide

type BaseFiltersProps = Pick<FiltersProps, 'filtersRef'>

export const BaseFilters: FC<BaseFiltersProps> = ({
	filtersRef
}: BaseFiltersProps) => {
	const classes = useBaseFilterStyles()

	const {
		defaultFilters = [{ id: uuidV4() }],
		loading,
		onSelectedFiltersChange,
		resetDynamicProps
	} = useFiltersContext()

	const [filtersList, setFiltersList] = useState<FiltersList>(defaultFilters)
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	useImperativeHandle(filtersRef, () => ({
		setFiltersList
	}))

	useEffect(() => {
		if (!isPopoverOpen && resetDynamicProps) resetDynamicProps()
	}, [isPopoverOpen, resetDynamicProps])

	const closePopover = () => setIsPopoverOpen(false)
	const openPopover = () => setIsPopoverOpen(true)

	const resetFiltersList = () => {
		setFiltersList([])
		onSelectedFiltersChange([])
	}

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
		onSelectedFiltersChange(formatSelectedFilters(filteredItems))
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
		selectedValues,
		type
	}: FiltersListItem) => {
		const clonedFilters = cloneDeep(filtersList)

		const selectedItem = find(clonedFilters, filter => filter.id === id)

		if (selectedItem) {
			if (selectedKey) {
				selectedItem.selectedKey = selectedKey
			} else if (selectedOperator) {
				selectedItem.selectedOperator = selectedOperator
			} else {
				selectedItem.selectedValues = selectedValues
			}

			setFiltersList(clonedFilters)

			if (
				!isEqual(
					formatSelectedFilters(clonedFilters),
					formatSelectedFilters(filtersList)
				)
			) {
				onSelectedFiltersChange(formatSelectedFilters(clonedFilters))
			}
		}
	}

	const renderFilterControls = () => (
		<div className={classes.filterControls}>
			<IconButton
				classes={[classes.filterIcon]}
				hasBorder
				icon={faFilter}
				onClick={openPopover}
			/>
			<div className={classes.filtersSummary} onClick={openPopover}>
				<FiltersSummary filtersList={filtersList} />
			</div>
		</div>
	)

	return (
		<div className={classes.container} id={filtersPopupWrapperId}>
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
