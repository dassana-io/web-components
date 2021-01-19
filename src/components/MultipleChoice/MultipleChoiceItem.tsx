import cn from 'classnames'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MultipleChoiceItemConfig } from '.'
import { useMultipleChoiceItemStyles } from './utils'
import { useShortcut } from '@dassana-io/web-utils'
import React, { FC, Key } from 'react'

export interface MultipleChoiceItemProps
	extends Omit<MultipleChoiceItemConfig, 'key'> {
	index: number
	isSelected?: boolean
	itemKey: Key
	onSelectedKeyChange: (key: Key) => void
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
	index,
	isSelected = false,
	itemKey,
	label,
	onSelectedKeyChange
}: MultipleChoiceItemProps) => {
	const classes = useMultipleChoiceItemStyles()

	const componentClasses = {
		[classes.multipleChoiceItem]: true,
		[classes.activeItem]: isSelected
	}

	const handleChange = () => onSelectedKeyChange(itemKey)

	const [lowercaseKey, uppercaseKey] = [
		String.fromCharCode(index + 97),
		String.fromCharCode(index + 65)
	]

	useShortcut({
		callback: handleChange,
		key: lowercaseKey,
		keyEvent: 'keydown'
	})

	useShortcut({
		callback: handleChange,
		key: uppercaseKey,
		keyEvent: 'keydown'
	})

	return (
		<div className={cn(componentClasses)} onClick={handleChange}>
			<div className={classes.key}>{String.fromCharCode(index + 65)}</div>
			<span>{label}</span>
			{isSelected && (
				<span className={classes.checkmark}>
					<FontAwesomeIcon icon={faCheck} />
				</span>
			)}
		</div>
	)
}

export default MultipleChoiceItem
