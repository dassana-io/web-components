import { Button } from 'components/Button'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import FilterUnit from './FilterUnit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'components/Link'
import { Popover } from 'components/Popover'
import { SelectOption } from 'components/Select'
import { usePopoverStyles } from './styles'
import {
	FiltersList,
	FiltersListItem,
	OnSearchWrapper,
	ProcessedFilters
} from './types'
import { IconButton, IconSizes } from 'components/IconButton'
import React, { FC } from 'react'

interface FilterPopoverProps {
	allFilters: ProcessedFilters
	closePopover: () => void
	dynamicOptions?: SelectOption[]
	dynamicSearchVal: string
	filtersList: FiltersList
	onVisibleChange: (visible: boolean) => void
	onClickAddFilter: () => void
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
	onSearchWrapper: OnSearchWrapper
	pending: boolean
	setFiltersList: React.Dispatch<React.SetStateAction<FiltersList>>
	visible?: boolean
}

export const FilterPopover: FC<FilterPopoverProps> = ({
	allFilters,
	closePopover,
	dynamicOptions,
	dynamicSearchVal,
	filtersList,
	onVisibleChange,
	onClickAddFilter,
	onDelete,
	onFilterChange,
	onSearchWrapper,
	pending,
	setFiltersList,
	visible = false
}: FilterPopoverProps) => {
	const classes = usePopoverStyles()

	return (
		<Popover
			classes={[classes.popover]}
			content={
				<div className={classes.popoverContent}>
					<IconButton
						classes={[classes.closeButton]}
						onClick={closePopover}
						size={IconSizes.sm}
					/>
					<div className={classes.popoverControls}>
						<div className={classes.popoverControlsChild}>
							<FontAwesomeIcon icon={faFilter} />
						</div>
						<Button
							classes={[classes.popoverControlsChild]}
							disabled={
								filtersList.length >=
								Object.keys(allFilters).length
							}
							onClick={onClickAddFilter}
						>
							+ Add Filter
						</Button>
						{filtersList.length > 0 && (
							<Link
								classes={[classes.popoverControlsChild]}
								onClick={() => setFiltersList([])}
							>
								Clear Filters
							</Link>
						)}
					</div>
					<div className={classes.filtersList}>
						{filtersList.map((filterItem, i) => (
							<FilterUnit
								allFilters={allFilters}
								dynamicOptions={dynamicOptions}
								dynamicSearchVal={dynamicSearchVal}
								filtersList={filtersList}
								id={filterItem.id}
								index={i}
								key={filterItem.id}
								onDelete={onDelete}
								onFilterChange={onFilterChange}
								onSearchWrapper={onSearchWrapper}
								pending={pending}
							/>
						))}
					</div>
				</div>
			}
			onVisibleChange={onVisibleChange}
			placement='bottomLeft'
			popupContainerSelector='#filters-popup-wrapper'
			popupTriggerClasses={[classes.popoverTrigger]}
			trigger='click'
			visible={visible}
		>
			<i />
		</Popover>
	)
}
