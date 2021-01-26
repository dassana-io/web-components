import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import MultipleChoiceItem from './MultipleChoiceItem'
import MultipleChoiceSkeleton from './MultipleChoiceSkeleton'
import { SharedMultiChoiceProps } from './types'
import { isEnglishAlphabet, useStyles } from './utils'
import React, { FC, useEffect, useState } from 'react'

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

	const [currentFocus, setCurrentFocus] = useState(0)
	const [isShiftPressed, setIsShiftPressed] = useState(false)

	// https://dev.to/rafi993/roving-focus-in-react-with-custom-hooks-1ln
	useEffect(() => {
		const preventDefault = (e: KeyboardEvent) => {
			e.preventDefault()
			e.stopPropagation()
		}

		// onKeyUp to keep track of Shift key being unpressed
		const onKeyUp = (e: KeyboardEvent) => {
			if (e.key === 'Shift') setIsShiftPressed(false)
			preventDefault(e)
		}

		// onKeyDown will check which key is pressed and conditionally select/deselect item or give focus to item
		const onKeyDown = (e: KeyboardEvent) => {
			//  if key pressed is english alphabet (either lower or uppercase), select/deselect item
			if (isEnglishAlphabet(e.key)) {
				preventDefault(e)

				const index = e.key.toUpperCase().charCodeAt(0) - 65

				onSelectedChange(items[index].value)
			}

			// Keep track of Shift key being pressed
			if (e.key === 'Shift') {
				preventDefault(e)

				setIsShiftPressed(true)
			}

			// For keys - ArrowRight, ArrowDown and Tab (without Shift) move focus to next item
			if (
				e.key === 'ArrowRight' ||
				e.key === 'ArrowDown' ||
				(e.key === 'Tab' && !isShiftPressed)
			) {
				preventDefault(e)

				setCurrentFocus(
					currentFocus === items.length - 1 ? 0 : currentFocus + 1
				)

				// For keys - ArrowLeft, ArrowUp and Tab (with Shift) move focus to previous item
			} else if (
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowUp' ||
				(e.key === 'Tab' && isShiftPressed)
			) {
				preventDefault(e)

				setCurrentFocus(
					currentFocus === 0 ? items.length - 1 : currentFocus - 1
				)
			}
		}

		const eventTargetRef = getEventTarget && getEventTarget()

		// attach event listener to the event target if one is provided, otherwise attach it to the window
		if (eventTargetRef && eventTargetRef.current) {
			const target = eventTargetRef.current

			target.addEventListener('keydown', onKeyDown)
			target.addEventListener('keyup', onKeyUp)

			return () => {
				target.removeEventListener('keydown', onKeyDown)
				target.removeEventListener('keyup', onKeyUp)
			}
		} else {
			window.addEventListener('keydown', onKeyDown)
			window.addEventListener('keyup', onKeyUp)

			return () => {
				window.removeEventListener('keydown', onKeyDown)
				window.removeEventListener('keyup', onKeyUp)
			}
		}
	}, [currentFocus, getEventTarget, isShiftPressed, items, onSelectedChange])

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
							focus={currentFocus === index}
							index={index}
							isSelected={isSelected}
							itemsCount={items.length}
							key={value}
							label={label}
							onSelectedChange={onSelectedChange}
							popupContainerSelector={popupContainerSelector}
							setFocus={setCurrentFocus}
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
