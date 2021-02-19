import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import MultipleChoiceItem from './MultipleChoiceItem'
import MultipleChoiceSkeleton from './MultipleChoiceSkeleton'
import { SharedProps } from './types'
import { isEnglishAlphabet, useStyles } from './utils'
import React, { FC, useEffect, useState } from 'react'

interface SharedBaseProps extends Omit<SharedProps, 'mode'> {
	onSelectedChange: (value: string) => void
	isSelected: (value: string) => boolean
}

interface SingleBaseProps extends SharedBaseProps {
	mode: 'single'
	value: string
}

interface MultipleBaseProps extends SharedBaseProps {
	mode: 'multiple'
	values: Record<string, boolean>
}

type BaseMultipleChoiceProps = SingleBaseProps | MultipleBaseProps

export const BaseMultipleChoice: FC<BaseMultipleChoiceProps> = ({
	classes = [],
	dataTag,
	getEventTarget,
	isSelected,
	items,
	loading = false,
	onSelectedChange,
	popupContainerSelector,
	singleColumnItemsCount = 8,
	skeletonItemCount = 6
}: BaseMultipleChoiceProps) => {
	const componentClasses = useStyles({ items, singleColumnItemsCount })

	const [currentFocus, setCurrentFocus] = useState(-1)

	// https://dev.to/rafi993/roving-focus-in-react-with-custom-hooks-1ln
	useEffect(() => {
		const preventDefault = (e: KeyboardEvent) => {
			e.preventDefault()
			e.stopPropagation()
		}

		// onKeyDown will check which key is pressed and conditionally select/deselect item or give focus to item
		const onKeyDown = (e: KeyboardEvent) => {
			const index = e.key.toUpperCase().charCodeAt(0) - 65

			// If key pressed is english alphabet (either lower or uppercase) and index of item is less than items length, select/deselect item
			if (isEnglishAlphabet(e.key) && index < items.length) {
				preventDefault(e)

				onSelectedChange(items[index].value)
			}

			// For keys - ArrowRight, ArrowDown and Tab (without Shift) move focus to next item
			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				preventDefault(e)

				setCurrentFocus(
					currentFocus === items.length - 1 ? 0 : currentFocus + 1
				)

				// For keys - ArrowLeft, ArrowUp and Tab (with Shift) move focus to previous item
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				preventDefault(e)

				setCurrentFocus(
					currentFocus === 0 ? items.length - 1 : currentFocus - 1
				)
			}
		}

		const eventTargetRef = getEventTarget && getEventTarget()

		// Attach event listener to the event target if one is provided, otherwise attach it to the window
		if (eventTargetRef && eventTargetRef.current) {
			const target = eventTargetRef.current

			target.addEventListener('keydown', onKeyDown)

			return () => {
				target.removeEventListener('keydown', onKeyDown)
			}
		} else {
			window.addEventListener('keydown', onKeyDown)

			return () => {
				window.removeEventListener('keydown', onKeyDown)
			}
		}
	}, [currentFocus, getEventTarget, items, onSelectedChange])

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
				items.map(({ value, label }, index) => (
					<MultipleChoiceItem
						focus={currentFocus === index}
						index={index}
						isSelected={isSelected(value)}
						itemsCount={items.length}
						key={value}
						label={label}
						onSelect={(index, value) => {
							setCurrentFocus(index)
							onSelectedChange(value)
						}}
						popupContainerSelector={popupContainerSelector}
						singleColumnItemsCount={singleColumnItemsCount}
						value={value}
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
