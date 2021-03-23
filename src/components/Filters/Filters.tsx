import cloneDeep from 'lodash/cloneDeep'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FilterPopover } from './FilterPopover'
import find from 'lodash/find'
import { Icon } from 'components/Icon'
import { IconButton } from 'components/IconButton'
import { Skeleton } from 'components/Skeleton'
import startCase from 'lodash/startCase'
import { styleguide } from 'components/assets/styles'
import truncate from 'lodash/truncate'
import { useFilterStyles } from './styles'
import { useShortcut } from '@dassana-io/web-utils'
import { v4 as uuidV4 } from 'uuid'
import {
	filterSelectedFilters,
	formatSelectedFilters,
	useFilters
} from './utils'
import { FiltersListItem, FiltersProps } from './types'
import React, { FC, Fragment, ReactNode, useState } from 'react'

const { spacing } = styleguide

export const Filters: FC<FiltersProps> = ({
	api,
	config,
	emitter,
	endpoint,
	onSelectedFiltersChange
}: FiltersProps) => {
	const {
		allFilters,
		dynamicOptions,
		dynamicSearchVal,
		filtersList,
		loading,
		onSearchWrapper,
		pending,
		setFiltersList
	} = useFilters(endpoint, api, emitter)

	const [visible, setVisible] = useState(false)

	const classes = useFilterStyles()

	const closePopover = () => setVisible(false)
	const openPopover = () => setVisible(true)

	useShortcut({
		callback: closePopover,
		key: 'Escape',
		keyEvent: 'keydown'
	})

	const onVisibleChange = (visible: boolean) => setVisible(visible)

	const onClickAddFilter = () =>
		setFiltersList([...filtersList, { id: uuidV4() }])

	const onDelete = (selectedId: string) => {
		const items = filtersList.filter(item => item.id !== selectedId)

		setFiltersList(items)
	}

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

	const renderFiltersSummary = () => {
		const filtersWithSelectedVals = filterSelectedFilters(filtersList)

		const formattedFilters = filtersWithSelectedVals.map(
			({ selectedKey, selectedValues = [] }) => {
				let values: string[] | ReactNode[]

				if (
					config &&
					config.iconConfig &&
					config.iconConfig.filterKey === selectedKey
				) {
					const iconMap = config.iconConfig.iconMap

					values = selectedValues.map(({ text, value }) =>
						iconMap[value] ? (
							<Icon
								height={15}
								icon={iconMap[value]}
								key={value}
							/>
						) : (
							text
						)
					)
				} else {
					values = selectedValues.map(({ text }) =>
						truncate(text, { length: 15 })
					)
				}

				const keyStr = startCase(selectedKey)

				return (
					<>
						<span className={classes.bracket}>[</span> {keyStr} ={' '}
						{values.map((val: string | ReactNode, i: number) => (
							<Fragment key={i}>
								{val}
								{i === values.length - 1 ? '' : ', '}
							</Fragment>
						))}
						<span className={classes.bracket}> ]</span>
					</>
				)
			}
		)

		return formattedFilters.map((filter, i) => (
			<Fragment key={i}>
				{filter}
				{i === formattedFilters.length - 1 ? '' : ' + '}
			</Fragment>
		))
	}

	return (
		<div className={classes.container} id='filters-popup-wrapper'>
			{loading ? (
				<div className={classes.filterControls}>
					<Skeleton height={spacing.xl} width={spacing.xl} />
				</div>
			) : (
				<>
					<FilterPopover
						allFilters={allFilters}
						closePopover={closePopover}
						config={config}
						dynamicOptions={dynamicOptions}
						dynamicSearchVal={dynamicSearchVal}
						filtersList={filtersList}
						onClickAddFilter={onClickAddFilter}
						onDelete={onDelete}
						onFilterChange={onFilterChange}
						onSearchWrapper={onSearchWrapper}
						onVisibleChange={onVisibleChange}
						pending={pending}
						setFiltersList={setFiltersList}
						visible={visible}
					/>
					<div className={classes.filterControls}>
						<IconButton
							classes={[classes.filterIcon]}
							hasBorder
							icon={faFilter}
							onClick={openPopover}
						/>
						<div
							className={classes.filtersSummary}
							onClick={openPopover}
						>
							{renderFiltersSummary()}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
