import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import MultipleChoiceItem from './MultipleChoiceItem'
import { MultipleChoiceProps } from './types'
import MultipleChoiceSkeleton from './MultipleChoiceSkeleton'
import { getInitialSelectedKeys, getSelectedKeysArr, useStyles } from './utils'
import React, { FC, Key, useState } from 'react'

export const MultipleChoice: FC<MultipleChoiceProps> = ({
	classes = [],
	dataTag,
	defaultSelectedKeys,
	items,
	loading = false,
	onChange,
	popupContainerSelector,
	keys,
	skeletonItemCount = 4
}: MultipleChoiceProps) => {
	const componentClasses = useStyles()

	const [selectedKeys, setSelectedKeys] = useState<Record<string, boolean>>(
		getInitialSelectedKeys(keys ? keys : defaultSelectedKeys)
	)

	const onSelectedKeyChange = (key: Key) => {
		const newSelectedKeys = {
			...selectedKeys,
			[key]: !selectedKeys[key]
		}

		setSelectedKeys(newSelectedKeys)

		onChange(getSelectedKeysArr(items, newSelectedKeys))
	}

	if (keys && !onChange) {
		throw new Error('Controlled components require an onChange prop')
	}

	return (
		<div className={cn(componentClasses.container, classes)}>
			{loading ? (
				<MultipleChoiceSkeleton count={skeletonItemCount} />
			) : (
				items.map(({ key, label }, index) => (
					<MultipleChoiceItem
						index={index}
						isSelected={!!selectedKeys[key]}
						itemKey={key}
						key={key}
						label={label}
						onSelectedKeyChange={onSelectedKeyChange}
						popupContainerSelector={popupContainerSelector}
						{...getDataTestAttributeProp(
							'multiple-choice',
							dataTag
						)}
					/>
				))
			)}
		</div>
	)
}

export * from './types'
