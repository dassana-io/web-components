import { MultipleChoiceItemConfig } from '.'
import { useShortcut } from '@dassana-io/web-utils'
import React, { FC, Key } from 'react'

export interface MultipleChoiceItemProps
	extends Omit<MultipleChoiceItemConfig, 'key'> {
	index: number
	itemKey: Key
	onSelectedKeyChange: (key: Key) => void
}

const MultipleChoiceItem: FC<MultipleChoiceItemProps> = ({
	index,
	itemKey,
	label,
	onSelectedKeyChange
}: MultipleChoiceItemProps) => {
	const handleChange = () => {
		onSelectedKeyChange(itemKey)
	}

	useShortcut({
		callback: handleChange,
		key: String.fromCharCode(index + 97),
		keyEvent: 'keydown'
	})

	useShortcut({
		callback: handleChange,
		key: String.fromCharCode(index + 65),
		keyEvent: 'keydown'
	})

	return (
		<div
			onClick={handleChange}
			style={{ border: '1px solid', cursor: 'pointer' }}
		>
			<span>{String.fromCharCode(index + 65)}</span>
			<span>{label}</span>
		</div>
	)
}

export default MultipleChoiceItem
