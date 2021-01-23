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
	useStyles
} from './utils'
import { Input, InputProps } from 'components/Input'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'

export interface Validate {
	(inputVal: string): boolean | string
}

export interface ChipInputProps
	extends Omit<InputProps, 'onChange' | 'onKeyDown' | 'type' | 'value'> {
	clearErrros?: () => void
	defaultValues?: string[]
	errorMsg?: string
	fieldErrorClasses?: string[]
	onChange?: (addedValues: string[]) => void
	undeleteableValues?: string[]
	validate?: Validate
	values?: string[]
}

export const ChipInput: FC<ChipInputProps> = ({
	addonAfter,
	addonBefore,
	classes = [],
	clearErrros,
	dataTag,
	defaultValues,
	disabled = false,
	error,
	errorMsg = '',
	fieldErrorClasses = [],
	fullWidth,
	inputRef,
	loading = false,
	onFocus,
	onChange,
	placeholder,
	undeleteableValues = [],
	validate,
	values
}: ChipInputProps) => {
	const shortcutMicrocopyRef = useRef<HTMLDivElement>(null)

	const [addedValues, setAddedValues] = useState<string[]>(
		getInitialValues(values, defaultValues)
	)
	const [inputValue, setInputValue] = useState('')
	const [isInvalidValue, setIsInvalidValue] = useState(false)
	const [localError, setLocalError] = useState(false)
	const [localErrorMsg, setLocalErrorMsg] = useState('')
	const [shortcutMicrocopyWidth, setShortcutMicrocopyWidth] = useState(101)

	const componentClasses = useStyles({ fullWidth, shortcutMicrocopyWidth })

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
		setLocalError(false)

		if (clearErrros) clearErrros()
	}

	const onKeyDown = (e: KeyboardEvent<Element>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			e.stopPropagation()

			let validated: boolean | string = true

			if (validate) {
				validated = validate(inputValue)

				if (validated !== true) {
					setLocalError(true)

					if (typeof validated === 'string')
						setLocalErrorMsg(validated)
				}
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
		!inputValue || addedValues.includes(inputValue) || localError || error
			? setIsInvalidValue(true)
			: setIsInvalidValue(false)
	}, [addedValues, inputValue, localError, error])

	useLayoutEffect(() => {
		if (shortcutMicrocopyRef && shortcutMicrocopyRef.current)
			setShortcutMicrocopyWidth(shortcutMicrocopyRef.current.scrollWidth)
	}, [])

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
					error={localError || error}
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
					shortcutMicrocopyRef={shortcutMicrocopyRef}
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