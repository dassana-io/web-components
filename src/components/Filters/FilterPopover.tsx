import { Button } from 'components/Button'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FiltersListItem } from './types'
import FilterUnit from './FilterUnit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'components/Link'
import { Popover } from 'components/Popover'
import { useFiltersContext } from './FiltersContext'
import { usePopoverStyles } from './styles'
import { IconButton, IconSizes } from 'components/IconButton'
import React, { FC } from 'react'

interface FilterPopoverProps {
	closePopover: () => void
	mode: 'backend' | 'frontend'
	onVisibleChange: (visible: boolean) => void
	onClickAddFilter: () => void
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
	visible?: boolean
}

export const FilterPopover: FC<FilterPopoverProps> = ({
	closePopover,
	mode,
	onVisibleChange,
	onClickAddFilter,
	onDelete,
	onFilterChange,
	visible = false
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
						{filtersList.map((filterItem, i) => (
							<FilterUnit
								id={filterItem.id}
								index={i}
								key={filterItem.id}
								mode={mode}
								onDelete={onDelete}
								onFilterChange={onFilterChange}
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
