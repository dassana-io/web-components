import { Button } from 'components/Button'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import FilterUnit from './FilterUnit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'components/Link'
import { Popover } from 'components/Popover'
import { SelectOption } from 'components/Select'
import { usePopoverStyles } from './styles'
import {
	FiltersConfig,
	FiltersList,
	FiltersListItem,
	OnSearchWrapper,
	ProcessedFilters
} from './types'
import { IconButton, IconSizes } from 'components/IconButton'
import React, { FC } from 'react'

interface SharedProps {
	allFilters: ProcessedFilters
	closePopover: () => void
	config?: FiltersConfig
	filtersList: FiltersList
	onVisibleChange: (visible: boolean) => void
	onClickAddFilter: () => void
	onDelete: (selectedId: string) => void
	onFilterChange: (filtersListItem: FiltersListItem) => void
	setFiltersList: React.Dispatch<React.SetStateAction<FiltersList>>
	visible?: boolean
}

interface ClientProps extends SharedProps {
	type: 'frontend'
}

interface ServerProps extends SharedProps {
	dynamicOptions?: SelectOption[]
	dynamicSearchVal?: string
	onSearchWrapper: OnSearchWrapper
	pending?: boolean
	type: 'backend'
}

type FilterPopoverProps = ClientProps | ServerProps

export const FilterPopover: FC<FilterPopoverProps> = ({
	allFilters,
	closePopover,
	config,
	filtersList,
	onVisibleChange,
	onClickAddFilter,
	onDelete,
	onFilterChange,
	setFiltersList,
	visible = false,
	...rest
}: FilterPopoverProps) => {
	const classes = usePopoverStyles()

	let conditionalProps:
		| Pick<ClientProps, 'type'>
		| Pick<
				ServerProps,
				| 'dynamicOptions'
				| 'dynamicSearchVal'
				| 'onSearchWrapper'
				| 'pending'
				| 'type'
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  >

	if (rest.type === 'backend') {
		const {
			dynamicOptions,
			dynamicSearchVal,
			onSearchWrapper,
			pending,
			type
		} = rest

		conditionalProps = {
			dynamicOptions,
			dynamicSearchVal,
			onSearchWrapper,
			pending,
			type
		}
	} else {
		conditionalProps = { type: rest.type }
	}

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
								config={config}
								filtersList={filtersList}
								id={filterItem.id}
								index={i}
								key={filterItem.id}
								onDelete={onDelete}
								onFilterChange={onFilterChange}
								{...conditionalProps}
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
