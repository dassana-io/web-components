import capitalize from 'lodash/capitalize'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { FilterCoordinators } from './types'
import { useFiltersContext } from './FiltersContext'
import React, { ChangeEvent, FC } from 'react'
import { Select, SelectOption } from 'components/Select'

const useStyles = createUseStyles({
	readOnly: {
		'& .ant-select-arrow': {
			display: 'none'
		},
		'& .ant-select-selector': {
			borderColor: 'transparent !important'
		}
	},
	selectContainer: {
		width: 'unset'
	}
})

const selectOptions: SelectOption[] = Object.values(FilterCoordinators).map(
	coord => ({ text: capitalize(coord), value: coord })
)

interface CommonFilterCoordinatorProps {
	coordinator: FilterCoordinators
	readOnly?: boolean
}

interface PrimaryFilterCoordinator extends CommonFilterCoordinatorProps {
	groupId?: never
	primary: true
}

interface GroupFilterCoordinator extends CommonFilterCoordinatorProps {
	groupId: string
	primary?: false
}

type FilterCoordinatorProps = PrimaryFilterCoordinator | GroupFilterCoordinator

export const FilterCoordinator: FC<FilterCoordinatorProps> = ({
	coordinator,
	groupId,
	primary = false,
	readOnly = true
}: FilterCoordinatorProps) => {
	const { updateGroupCoordinator, updatePrimaryCoordinator } =
		useFiltersContext()

	const classes = useStyles()

	const onCoordinatorSelect = (
		coordinator: ChangeEvent<HTMLSelectElement>
	) => {
		const coord = coordinator as unknown as FilterCoordinators

		primary
			? updatePrimaryCoordinator(coord)
			: groupId && updateGroupCoordinator(groupId, coord)
	}

	return (
		<Select
			classes={[cn({ [classes.readOnly]: readOnly })]}
			containerClasses={[classes.selectContainer]}
			disabled={readOnly}
			matchSelectedContentWidth={50}
			onChange={onCoordinatorSelect}
			options={selectOptions}
			value={coordinator}
		/>
	)
}
