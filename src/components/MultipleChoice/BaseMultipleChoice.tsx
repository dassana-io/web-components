import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import MultipleChoiceItem from './MultipleChoiceItem'
import MultipleChoiceSkeleton from './MultipleChoiceSkeleton'
import { SharedMultiChoiceProps } from './types'
import { isEnglishAlphabet, useStyles } from './utils'
import React, { FC, useEffect } from 'react'

interface SharedBaseMultipleChoiceProps
	extends Omit<SharedMultiChoiceProps, 'mode'> {
	onSelectedChange: (value: string) => void
}

interface SingleBaseMultipleChoiceProps extends SharedBaseMultipleChoiceProps {
	mode: 'single'
	value: string
}

interface MultipleBaseMultipleChoiceProps
	extends SharedBaseMultipleChoiceProps {
	mode: 'multiple'
	values: Record<string, boolean>
}

type BaseMultipleChoiceProps =
	| SingleBaseMultipleChoiceProps
	| MultipleBaseMultipleChoiceProps

export const BaseMultipleChoice: FC<BaseMultipleChoiceProps> = (
	props: BaseMultipleChoiceProps
) => {
	const {
		classes = [],
		dataTag,
		getEventTarget,
		items,
		loading = false,
		onSelectedChange,
		popupContainerSelector,
		singleColumnItemsCount = 8,
		skeletonItemCount = 4
	} = props

	const componentClasses = useStyles(props)

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (isEnglishAlphabet(e.key)) {
				e.preventDefault()
				e.stopPropagation()

				const index = e.key.toUpperCase().charCodeAt(0) - 65

				onSelectedChange(items[index].value)
			}
		}

		const eventTargetRef = getEventTarget && getEventTarget()

		if (eventTargetRef && eventTargetRef.current) {
			const target = eventTargetRef.current

			target.addEventListener('keydown', onKeyDown)

			return () => target.removeEventListener('keydown', onKeyDown)
		} else {
			window.addEventListener('keydown', onKeyDown)

			return () => window.removeEventListener('keydown', onKeyDown)
		}
	}, [getEventTarget, items, onSelectedChange])

	if (items.length > 26)
		throw new Error(
			'There can be no more than 26 items in a multiple choice component.'
		)

	return (
		<div className={cn(componentClasses.container, classes)}>
			{loading ? (
				<MultipleChoiceSkeleton
					count={skeletonItemCount}
					itemsCount={items.length}
					singleColumnItemsCount={singleColumnItemsCount}
				/>
			) : (
				items.map(({ value, label }, index) => {
					const isSelected =
						props.mode === 'single'
							? props.value === value
							: !!props.values[value]

					return (
						<MultipleChoiceItem
							index={index}
							isSelected={isSelected}
							itemsCount={items.length}
							key={value}
							label={label}
							onSelectedChange={onSelectedChange}
							popupContainerSelector={popupContainerSelector}
							singleColumnItemsCount={singleColumnItemsCount}
							value={value}
							{...getDataTestAttributeProp(
								'multiple-choice',
								dataTag
							)}
						/>
					)
				})
			)}
		</div>
	)
}
