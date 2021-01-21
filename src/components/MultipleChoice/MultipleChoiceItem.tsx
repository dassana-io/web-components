import cn from 'classnames'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MultipleChoiceItemConfig } from '.'
import { Tooltip } from 'components/Tooltip'
import { useMultipleChoiceItemStyles } from './utils'
import React, { FC, Key } from 'react'

export interface MultipleChoiceItemProps
	extends Omit<MultipleChoiceItemConfig, 'key'> {
	index: number
	isSelected?: boolean
	itemKey: Key
	onSelectedKeyChange: (key: Key) => void
	popupContainerSelector?: string
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
	index,
	isSelected = false,
	itemKey,
	label,
	onSelectedKeyChange,
	popupContainerSelector
}: MultipleChoiceItemProps) => {
	const classes = useMultipleChoiceItemStyles()

	const componentClasses = {
		[classes.multipleChoiceItem]: true,
		[classes.activeItem]: isSelected
	}

	const handleChange = () => onSelectedKeyChange(itemKey)

	const uppercaseKey = String.fromCharCode(index + 65)

	return (
		<Tooltip
			placement='left'
			popupContainerSelector={popupContainerSelector}
			title={`Key ${uppercaseKey}`}
			tooltipTriggerClasses={[classes.tooltipTrigger]}
		>
			<div className={cn(componentClasses)} onClick={handleChange}>
				<div className={classes.key}>{uppercaseKey}</div>
				<span>{label}</span>
				{isSelected && (
					<span className={classes.checkmark}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
				)}
			</div>
		</Tooltip>
	)
}

export default MultipleChoiceItem
