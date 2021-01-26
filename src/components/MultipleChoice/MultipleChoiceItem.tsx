import cn from 'classnames'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MultipleChoiceItemConfig } from './types'
import { Tooltip } from 'components/Tooltip'
import { useMultipleChoiceItemStyles } from './utils'
import React, { FC, KeyboardEvent, useCallback, useEffect, useRef } from 'react'

export interface MultipleChoiceItemProps extends MultipleChoiceItemConfig {
	index: number
	isSelected?: boolean
	itemsCount: number
	focus?: boolean
	onSelectedChange: (value: string) => void
	popupContainerSelector?: string
	setFocus: (index: number) => void
	singleColumnItemsCount?: number
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
	index,
	isSelected = false,
	itemsCount,
	focus,
	label,
	onSelectedChange,
	popupContainerSelector,
	setFocus,
	singleColumnItemsCount = 8,
	value
}: MultipleChoiceItemProps) => {
	const classes = useMultipleChoiceItemStyles({
		itemsCount,
		singleColumnItemsCount
	})
	const multipleChoiceItemRef = useRef<HTMLDivElement>(null)

	const componentClasses = {
		[classes.multipleChoiceItem]: true,
		[classes.activeItem]: isSelected
	}

	const handleChange = useCallback(() => {
		setFocus(index)

		onSelectedChange(value)
	}, [index, onSelectedChange, setFocus, value])

	const uppercaseKey = String.fromCharCode(index + 65)

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLDivElement>) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				e.stopPropagation()

				handleChange()
			}
		},
		[handleChange]
	)

	useEffect(() => {
		if (focus) {
			if (multipleChoiceItemRef && multipleChoiceItemRef.current)
				multipleChoiceItemRef.current.focus()
		}
	}, [focus])

	return (
		<Tooltip
			placement='left'
			popupContainerSelector={popupContainerSelector}
			renderWithoutDataTag
			title={`Key ${uppercaseKey}`}
		>
			<div
				className={cn(componentClasses)}
				onClick={handleChange}
				onKeyDown={onKeyDown}
				ref={multipleChoiceItemRef}
				tabIndex={focus ? 0 : -1}
			>
				<div className={classes.key}>{uppercaseKey}</div>
				<span className={classes.label}>{label}</span>
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
