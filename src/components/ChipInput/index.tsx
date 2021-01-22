import { BaseFieldProps } from 'components/Form/types'
import { BaseFormElementProps } from 'components/types'
import cn from 'classnames'
import FieldError from 'components/Form/FieldError'
import { getDataTestAttributeProp } from 'components/utils'
import { ShortcutMicrocopy } from 'components/ShortcutMicrocopy'
import { Skeleton } from 'components/Skeleton'
import { Tag } from 'components/Tag'
import {
	getInitialValues,
	getInputValue,
	getTagDeletionProps,
	shortcutMicrocopyWidth,
	useStyles
} from './utils'
import { Input, InputProps } from 'components/Input'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	useEffect,
	useState
} from 'react'

export interface Validate {
	(inputVal: string): boolean | string
}

export interface ChipInputProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'>,
		Pick<InputProps, 'addonAfter' | 'addonBefore' | 'inputRef' | 'onFocus'>,
		Pick<BaseFieldProps, 'fieldErrorClasses'> {
	defaultValues?: string[]
	errorMsg?: string
	onChange?: (addedValues: string[]) => void
	undeleteableValues?: string[]
	validate?: Validate
	values?: string[]
}

export const ChipInput: FC<ChipInputProps> = ({
	addonAfter,
	addonBefore,
	onChange,
	classes = [],
	dataTag,
	defaultValues,
	error,
	errorMsg = '',
	fieldErrorClasses = [],
	disabled = false,
	inputRef,
	onFocus,
	fullWidth,
	loading = false,
	placeholder,
	undeleteableValues = [],
	validate,
	values
}: ChipInputProps) => {
	const [addedValues, setAddedValues] = useState<string[]>(
		getInitialValues(values, defaultValues)
	)
	const [inputValue, setInputValue] = useState('')
	const [isInvalidValue, setIsInvalidValue] = useState(false)
	const [localErrorMsg, setLocalErrorMsg] = useState('')

	const componentClasses = useStyles({ fullWidth })

	const addInputValue = () => {
		const newValues = [
			...addedValues,
			getInputValue(inputValue, addonBefore, addonAfter)
		]

		setAddedValues(newValues)

		if (onChange) onChange(newValues)

		setInputValue('')
	}

	const onDelete = (value: string) => {
		const newValues = addedValues.filter(addedValue => addedValue !== value)

		setAddedValues(newValues)

		if (onChange) onChange(newValues)
	}

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value.toLowerCase())
		setLocalErrorMsg('')
	}

	const onKeyDown = (e: KeyboardEvent<Element>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			e.stopPropagation()

			let validated: boolean | string = true

			if (validate) {
				validated = validate(inputValue)

				if (typeof validated === 'string') setLocalErrorMsg(validated)
			}

			if (!isInvalidValue && !disabled && validated === true)
				addInputValue()
		}
	}

	const renderSkeletenTags = () => (
		<>
			<Skeleton height={22} width={70} />
			<Skeleton
				classes={[componentClasses.skeleton]}
				height={22}
				width={85}
			/>
		</>
	)

	const renderTags = () =>
		addedValues.map(value => (
			<Tag
				classes={[componentClasses.tag]}
				key={value}
				{...getTagDeletionProps(value, undeleteableValues, onDelete)}
			>
				{value}
			</Tag>
		))

	useEffect(() => {
		!inputValue || addedValues.includes(inputValue) || error
			? setIsInvalidValue(true)
			: setIsInvalidValue(false)
	}, [addedValues, inputValue, error])

	if (values && !onChange)
		throw new Error('Controlled chip inputs require an onChange prop')

	return (
		<div
			className={cn(classes)}
			{...getDataTestAttributeProp('chip-input', dataTag)}
		>
			<div className={componentClasses.wrapper}>
				<Input
					addonBefore={addonBefore}
					disabled={disabled}
					error={!!localErrorMsg || error}
					fullWidth={fullWidth}
					inputRef={inputRef}
					loading={loading}
					onChange={onInputChange}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					value={inputValue}
				/>
				<ShortcutMicrocopy
					loading={loading}
					width={shortcutMicrocopyWidth}
				/>
			</div>
			<div className={componentClasses.tagsWrapper}>
				{loading ? renderSkeletenTags() : renderTags()}
			</div>
			<FieldError
				classes={fieldErrorClasses}
				error={localErrorMsg || errorMsg}
				fullWidth={fullWidth}
			/>
		</div>
	)
}
