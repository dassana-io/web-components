import { BaseFormElementProps } from 'components/types'
import { Button } from 'components/Button'
import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import { Tag } from 'components/Tag'
import { getInitialValues, useStyles } from './utils'
import { Input, InputProps } from 'components/Input'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	useEffect,
	useState
} from 'react'

export interface ChipInputProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'>,
		Pick<InputProps, 'inputRef' | 'onFocus'> {
	defaultValues?: string[]
	onChange?: (addedValues: string[]) => void
	values?: string[]
}

export const ChipInput: FC<ChipInputProps> = ({
	onChange,
	classes = [],
	dataTag,
	defaultValues,
	error,
	disabled = false,
	inputRef,
	onFocus,
	fullWidth,
	loading = false,
	placeholder,
	values
}: ChipInputProps) => {
	const [addedValues, setAddedValues] = useState<string[]>(
		getInitialValues(values, defaultValues)
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
			e.stopPropagation()

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
		<div
			className={cn(classes)}
			{...getDataTestAttributeProp('chip-input', dataTag)}
		>
			<div className={componentClasses.inputAndBtnWrapper}>
				<Input
					disabled={disabled}
					error={error}
					fullWidth={fullWidth}
					inputRef={inputRef}
					loading={loading}
					onChange={onInputChange}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
				/>
				<div className={componentClasses.btnWrapper}>
					<Button
						classes={[componentClasses.enterBtn]}
						disabled={disabled || isInvalidValue}
						loading={loading}
						onClick={onEnterBtnClick}
					>
						⏎
					</Button>
				</div>
			</div>
			<div className={componentClasses.tagsWrapper}>
				{!loading &&
					addedValues.map(value => (
						<Tag
							classes={[componentClasses.tag]}
							deletable
							key={value}
							onDelete={() => onDelete(value)}
						>
							{value}
						</Tag>
					))}
			</div>
		</div>
	)
}
