import { BaseFormElementProps } from 'components/types'
import { Button } from 'components/Button'
import cn from 'classnames'
import { Input } from 'components/Input'
import { Tag } from 'components/Tag'
import { useShortcut } from '@dassana-io/web-utils'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'

export interface ChipInputProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	onChange?: (addedValues: string[]) => void
	values?: string[]
}

export const ChipInput: FC<ChipInputProps> = ({
	onChange,
	classes = [],
	error,
	disabled = false,
	loading = false,
	placeholder,
	values
}: ChipInputProps) => {
	const [addedValues, setAddedValues] = useState<string[]>(
		values ? values : []
	)
	const [currInputValue, setCurrInputValue] = useState('')
	const [isInvalidValue, setIsInvalidValue] = useState(false)

	const onDelete = (value: string) => {
		const newValues = addedValues.filter(addedValue => addedValue !== value)

		setAddedValues(newValues)

		if (onChange) onChange(newValues)
	}

	const onEnterBtnClick = () => {
		const newValues = [...addedValues, currInputValue]

		setAddedValues(newValues)

		if (onChange) onChange(newValues)
	}

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
		setCurrInputValue(event.target.value.toLowerCase())

	useEffect(() => {
		!currInputValue || addedValues.includes(currInputValue) || error
			? setIsInvalidValue(true)
			: setIsInvalidValue(false)
	}, [addedValues, currInputValue, error])

	useShortcut({
		additionalConditionalFn: () => !disabled || !isInvalidValue,
		callback: onEnterBtnClick,
		key: 'Enter',
		keyEvent: 'keydown'
	})

	if (values && !onChange)
		throw new Error('Controlled chip inputs require an onChange prop')

	return (
		<div className={cn(classes)}>
			<div>
				<Input
					disabled={disabled}
					error={error}
					loading={loading}
					onChange={onInputChange}
					placeholder={placeholder}
				/>
				<Button
					disabled={disabled || isInvalidValue}
					loading={loading}
					onClick={onEnterBtnClick}
				>
					⏎
				</Button>
			</div>
			<div>
				{!loading &&
					addedValues.map((value, i) => (
						<Tag
							key={`${value}-${i}`}
							onDelete={() => onDelete(value)}
						>
							{value}
						</Tag>
					))}
			</div>
		</div>
	)
}
