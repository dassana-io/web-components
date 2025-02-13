import { Button } from '../Button'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FilterModal } from './FilterModal'
import { filtersPopupWrapperId } from './utils'
import FilterUnit from './FilterUnit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '../Link'
import { Popover } from '../Popover'
import { useFiltersContext } from './FiltersContext'
import { usePopoverStyles } from './styles'
import { Breakpoints, useWindowSize } from '@dassana-io/web-utils'
import {
	type FilterOption,
	type FiltersList,
	type FiltersListItem
} from './types'
import { IconButton, IconSizes } from '../IconButton'
import React, { type FC } from 'react'

interface FilterPopoverProps {
	alwaysOpen?: boolean
	closePopover: () => void
	filtersList: FiltersList
	isPopoverOpen?: boolean
	onClickAddFilter: () => void
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
	resetFiltersList: () => void
	togglePopoverVisibility: (isPopoverOpen: boolean) => void
}

export const FilterPopover: FC<FilterPopoverProps> = ({
	alwaysOpen = false,
	closePopover,
	filtersList = [],
	isPopoverOpen = false,
	onClickAddFilter,
	onDelete,
	onFilterChange,
	resetFiltersList,
	togglePopoverVisibility
}: FilterPopoverProps) => {
	const {
		windowSize: { height, width }
	} = useWindowSize()

	const { allFilters, popoverClasses = [] } = useFiltersContext()

	const classes = usePopoverStyles({ windowHeight: height })

	const renderContent = () => (
		<div
			className={classes.popoverContent}
			onClick={e => e.stopPropagation()}
		>
			{!alwaysOpen && (
				<IconButton
					classes={[classes.closeButton]}
					onClick={closePopover}
					size={IconSizes.sm}
				/>
			)}
			<div className={classes.popoverControls}>
				<div className={classes.popoverControlsChild}>
					<FontAwesomeIcon icon={faFilter} />
				</div>
				<Button
					classes={[classes.popoverControlsChild]}
					disabled={
						filtersList.length >= Object.keys(allFilters).length
					}
					onClick={onClickAddFilter}
				>
					+ Add Filter
				</Button>
				{filtersList.length > 0 && (
					<Link
						classes={[classes.popoverControlsChild]}
						onClick={resetFiltersList}
					>
						Clear Filters
					</Link>
				)}
			</div>
			<div className={classes.filtersList}>
				{filtersList.map(
					({
						id,
						selectedKey,
						selectedOperator,
						selectedValues,
						type
					}) => {
						const filterOption = selectedKey
							? allFilters[selectedKey]
							: ({} as FilterOption)

						return (
							<FilterUnit
								filterOptOperator={filterOption?.operator}
								filterOptValues={filterOption?.values}
								filtersList={filtersList}
								id={id}
								key={id}
								onDelete={onDelete}
								onFilterChange={onFilterChange}
								selectedKey={selectedKey}
								selectedOperator={selectedOperator}
								selectedValues={selectedValues}
								staticFilter={filterOption?.staticFilter}
								valueType={filterOption?.type}
							/>
						)
					}
				)}
			</div>
		</div>
	)

	if (alwaysOpen) {
		return <div>{renderContent()}</div>
	}

	return width <= Breakpoints.tablet ? (
		<FilterModal isPopoverOpen={isPopoverOpen}>
			{renderContent()}
		</FilterModal>
	) : (
		<Popover
			classes={[classes.popover, ...popoverClasses]}
			content={renderContent()}
			onVisibleChange={togglePopoverVisibility}
			placement='bottomLeft'
			popupContainerSelector={`#${filtersPopupWrapperId}`}
			popupTriggerClasses={[classes.popoverTrigger]}
			trigger='click'
			visible={isPopoverOpen}
		>
			{/* <i /> is just a placeholder. The filter controls that triggers
      the popover lives in ./BaseFilters. This was done because positioning
      the Popover to cover the controls is easier when it's not a child of the
      Popover.
      */}
			<i />
		</Popover>
	)
}
