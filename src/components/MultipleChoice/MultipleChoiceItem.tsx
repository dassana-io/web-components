import cn from 'classnames'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import isEmpty from 'lodash/isEmpty'
import { Tooltip } from 'components/Tooltip'
import { useMultipleChoiceItemStyles } from './utils'
import { KeysPressedMap, MultipleChoiceItemConfig } from './types'
import React, { FC, KeyboardEvent, useCallback, useEffect, useRef } from 'react'

export interface MultipleChoiceItemProps extends MultipleChoiceItemConfig {
	focus?: boolean
	index: number
	isSelected?: boolean
	itemsCount: number
	keysPressedMap: KeysPressedMap
	onSelect: (index: number, value: string) => void
	popupContainerSelector?: string
	singleColumnItemsCount?: number
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
	focus,
	index,
	isSelected = false,
	itemsCount,
	keysPressedMap,
	label,
	onSelect,
	popupContainerSelector,
	singleColumnItemsCount = 8,
	value
}: MultipleChoiceItemProps) => {
	const classes = useMultipleChoiceItemStyles({
		itemsCount,
		singleColumnItemsCount
	})
	const multipleChoiceItemRef = useRef<HTMLDivElement>(null)

	const componentClasses = {
		[classes.activeItem]: isSelected,
		[classes.focused]: focus,
		[classes.multipleChoiceItem]: true
	}

	const handleChange = useCallback(() => {
		onSelect(index, value)
	}, [index, onSelect, value])

	const uppercaseKey = String.fromCharCode(index + 65)

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLDivElement>) => {
			const { Enter, ...rest } = keysPressedMap

			if (e.key === 'Enter' && isEmpty(rest)) {
				e.preventDefault()
				e.stopPropagation()

				handleChange()
			}
		},
		[handleChange, keysPressedMap]
	)

	useEffect(() => {
		if (focus && multipleChoiceItemRef.current)
			multipleChoiceItemRef.current.focus()
	}, [focus])

	return (
		<Tooltip
			placement='left'
			popupContainerSelector={popupContainerSelector}
			renderWithoutDataTag
			title={`Key ${uppercaseKey}`}
			triggerMode={['focus', 'hover']}
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
