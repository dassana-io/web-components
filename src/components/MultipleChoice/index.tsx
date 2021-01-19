import { getSelectedKeysArr } from './utils'
import MultipleChoiceItem from './MultipleChoiceItem'
import { MultipleChoiceProps } from './types'
import React, { FC, Key, useState } from 'react'

export const MultipleChoice: FC<MultipleChoiceProps> = ({
	items,
	onChange
}: MultipleChoiceProps) => {
	const [selectedKeys, setSelectedKeys] = useState<Record<string, boolean>>(
		{}
	)

	const onSelectedKeyChange = (key: Key) => {
		const newSelectedKeys = {
			...selectedKeys,
			[key]: !selectedKeys[key]
		}

		setSelectedKeys(newSelectedKeys)

		onChange(getSelectedKeysArr(items, newSelectedKeys))
	}

	return (
		<div>
			{items.map(({ key, label }, index) => (
				<MultipleChoiceItem
					index={index}
					itemKey={key}
					key={key}
					label={label}
					onSelectedKeyChange={onSelectedKeyChange}
				/>
			))}
		</div>
	)
}

export * from './types'
