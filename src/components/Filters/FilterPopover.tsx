import { Button } from '../Button'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FiltersListItem } from './types'
import FilterUnit from './FilterUnit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '../Link'
import { Popover } from '../Popover'
import { useFiltersContext } from './FiltersContext'
import { usePopoverStyles } from './styles'
import { IconButton, IconSizes } from '../IconButton'
import React, { FC } from 'react'

interface FilterPopoverProps {
	closePopover: () => void
	isPopoverOpen?: boolean
	onClickAddFilter: () => void
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
	togglePopoverVisibility: (isPopoverOpen: boolean) => void
}

export const FilterPopover: FC<FilterPopoverProps> = ({
	closePopover,
	isPopoverOpen = false,
	onClickAddFilter,
	onDelete,
	onFilterChange,
	togglePopoverVisibility
}: FilterPopoverProps) => {
	const { allFilters, filtersList, setFiltersList } = useFiltersContext()

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
						{filtersList.map(
							({
								id,
								selectedKey,
								selectedOperator,
								selectedValues
							}) => (
								<FilterUnit
									id={id}
									key={id}
									onDelete={onDelete}
									onFilterChange={onFilterChange}
									selectedKey={selectedKey}
									selectedOperator={selectedOperator}
									selectedValues={selectedValues}
								/>
							)
						)}
					</div>
				</div>
			}
			onVisibleChange={togglePopoverVisibility}
			placement='bottomLeft'
			popupContainerSelector='#filters-popup-wrapper'
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
