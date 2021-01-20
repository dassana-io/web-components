import { BaseFormElementProps } from 'components/types'
import { Button } from 'components/Button'
import cn from 'classnames'
import { Input } from 'components/Input'
import { Tag } from 'components/Tag'
import { useStyles } from './utils'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	useEffect,
	useState
} from 'react'

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
	fullWidth,
	loading = false,
	placeholder,
	values
}: ChipInputProps) => {
	const [addedValues, setAddedValues] = useState<string[]>(
		values ? values : []
	)
	const [currInputValue, setCurrInputValue] = useState('')
	const [isInvalidValue, setIsInvalidValue] = useState(false)

	const componentClasses = useStyles({ fullWidth })

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

	const onKeyDown = (e: KeyboardEvent<Element>) => {
		if (e.key === 'Enter') {
			e.preventDefault()

			if (!isInvalidValue && !disabled) onEnterBtnClick()
		}
	}

	useEffect(() => {
		!currInputValue || addedValues.includes(currInputValue) || error
			? setIsInvalidValue(true)
			: setIsInvalidValue(false)
	}, [addedValues, currInputValue, error])

	if (values && !onChange)
		throw new Error('Controlled chip inputs require an onChange prop')

	return (
		<div className={cn(classes)}>
			<div className={componentClasses.inputAndButtonWrapper}>
				<Input
					disabled={disabled}
					error={error}
					fullWidth={fullWidth}
					loading={loading}
					onChange={onInputChange}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
				/>
				<Button
					classes={[componentClasses.enterButton]}
					disabled={disabled || isInvalidValue}
					loading={loading}
					onClick={onEnterBtnClick}
				>
					⏎
				</Button>
			</div>
			<div className={componentClasses.tagsWrapper}>
				{!loading &&
					addedValues.map((value, i) => (
						<Tag
							classes={[componentClasses.tag]}
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
