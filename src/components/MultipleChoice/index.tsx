import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import MultipleChoiceItem from './MultipleChoiceItem'
import { MultipleChoiceProps } from './types'
import MultipleChoiceSkeleton from './MultipleChoiceSkeleton'
import {
	getInitialSelectedKeys,
	getSelectedKeysArr,
	isEnglishAlphabet,
	useStyles
} from './utils'
import React, { FC, Key, KeyboardEvent, useState } from 'react'

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

	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (isEnglishAlphabet(e.key)) {
			e.preventDefault()
			e.stopPropagation()

			const index = e.key.toUpperCase().charCodeAt(0) - 65

			onSelectedKeyChange(items[index].key)
		}
	}

	if (items.length > 26)
		throw new Error(
			'There can be no more than 26 items in a multiple choice component.'
		)

	return (
		<div
			className={cn(componentClasses.container, classes)}
			onKeyDown={onKeyDown}
		>
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
