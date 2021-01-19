import cn from 'classnames'
import MultipleChoiceItem from './MultipleChoiceItem'
import { MultipleChoiceProps } from './types'
import { getSelectedKeysArr, useStyles } from './utils'
import React, { FC, Key, useState } from 'react'

export const MultipleChoice: FC<MultipleChoiceProps> = ({
	classes = [],
	items,
	onChange,
	popupContainerSelector
}: MultipleChoiceProps) => {
	const componentClasses = useStyles()

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
		<div className={cn(componentClasses.container, classes)}>
			{items.map(({ key, label }, index) => (
				<MultipleChoiceItem
					index={index}
					isSelected={!!selectedKeys[key]}
					itemKey={key}
					key={key}
					label={label}
					onSelectedKeyChange={onSelectedKeyChange}
					popupContainerSelector={popupContainerSelector}
				/>
			))}
		</div>
	)
}

export * from './types'
