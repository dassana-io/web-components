import cn from 'classnames'
import { useDropdownStyles } from '../styles'
import { useShortcut } from '@dassana-io/web-utils'
import { CommonFilterUnitConfig, KeyConfig } from './mockData'
import React, { FC, useCallback, useState } from 'react'

interface DropdownProps {
	onDropdownItemClick: (val: CommonFilterUnitConfig | KeyConfig) => void
	suggestions: CommonFilterUnitConfig[]
}

export const Dropdown: FC<DropdownProps> = ({
	onDropdownItemClick,
	suggestions = []
}: DropdownProps) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const classes = useDropdownStyles()

	// TODO: refactor this mess
	const onArrowDownKeypress = useCallback(() => {
		setActiveIndex(
			activeIndex === suggestions.length - 1 ? 0 : activeIndex + 1
		)
	}, [activeIndex, suggestions.length])

	const onArrowUpKeypress = useCallback(() => {
		setActiveIndex(
			activeIndex === 0 ? suggestions.length - 1 : activeIndex - 1
		)
	}, [activeIndex, suggestions.length])

	const onEnter = useCallback(() => {
		console.log('on enter dropdown click')
		onDropdownItemClick(suggestions[activeIndex])
		setActiveIndex(0)
	}, [activeIndex, onDropdownItemClick, suggestions])

	useShortcut({
		callback: onArrowDownKeypress,
		key: 'ArrowDown',
		keyEvent: 'keydown',
		preventDefault: true
	})

	useShortcut({
		callback: onArrowUpKeypress,
		key: 'ArrowUp',
		keyEvent: 'keydown',
		preventDefault: true
	})

	useShortcut({
		additionalConditionalFn: () => suggestions.length > 0,
		callback: onEnter,
		key: 'Enter',
		keyEvent: 'keydown'
	})

	return (
		<div className={classes.container}>
			{suggestions.map((suggestion, i) => (
				<div
					className={cn({
						[classes.dropdownItem]: true,
						[classes.focus]: activeIndex === i
					})}
					key={i}
					onClick={() => {
						onDropdownItemClick(suggestion)
					}}
				>
					{suggestion.value}
				</div>
			))}
		</div>
	)
}
