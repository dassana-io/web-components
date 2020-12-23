import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { SelectSkeleton } from '../SharedComponents'
import { useStyles } from './utils'
import { Checkbox, Input } from 'components'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'

import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	useCallback,
	useEffect,
	useState
} from 'react'

const { Option } = AntDSelect

export interface MultiSelectOption {
	text: string
	value: string
}

export interface MultiSelectProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	allowClear?: boolean
	/**
	 * Default values for select component. Without this, the select dropdown will be blank until an option is selected. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	/**
	 * To set the width of the select to be the same as the
	 */
	matchSelectedContentWidth?: boolean | number
	maxTagCount?: number
	maxTagTextLength?: number
	/**
	 * Array of options to be rendered in the dropdown
	 */
	onChange?: (values: string[]) => void
	onSearch?: (value: string) => void
	/**
	 * Only valid if showSearch is true and and onSearch is not passed. By default options are only filtered by text. To filter by other keys, pass an array of keys to filter. Eg. ['value']
	 * @default ['text']
	 */
	optionKeysToFilter?: string[]
	options: MultiSelectOption[]
	pending?: boolean
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	searchPlaceholder?: string
	/**
	 * Whether or not to show search input
	 * @default false
	 */
	showSearch?: boolean
	/**
	 * Selected values for if component is controlled. Requires an onChange to be passed
	 */
	values?: string[]
}

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		allowClear,
		classes = [],
		dataTag,
		defaultValues = [],
		disabled = false,
		error = false,
		loading = false,
		maxTagCount = 2,
		maxTagTextLength = 6,
		// pending = false,
		popupContainerSelector,
		onChange,
		onSearch,
		optionKeysToFilter = ['text'],
		options,
		placeholder = '',
		searchPlaceholder = '',
		showSearch = false,
		values
	} = props
	const [localValues, setLocalValues] = useState(values || defaultValues)
	const [filteredOptions, setFilteredOptions] = useState<MultiSelectOption[]>(
		[]
	)
	const [optionsToMap, setOptionsToMap] = useState<MultiSelectOption[]>([])
	const [searchTerm, setSearchTerm] = useState('')

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error
		},
		classes
	)

	const fuse = new Fuse(options, {
		isCaseSensitive: false,
		keys: optionKeysToFilter,
		threshold: 0.1
	})

	const searchOptions = (value: string) => {
		setSearchTerm(value)

		const filteredOptions = fuse
			.search(value)
			.map(
				({
					item
				}: Fuse.FuseResult<MultiSelectOption>): MultiSelectOption =>
					item
			)

		setFilteredOptions(filteredOptions)
	}

	const delayedSearch = useCallback(
		debounce(q => searchOptions(q), 50),
		[options]
	)

	useEffect(() => {
		setOptionsToMap(searchTerm ? filteredOptions : options)
	}, [options, filteredOptions, searchTerm])

	useEffect(() => {
		onSearch ? onSearch(searchTerm) : delayedSearch(searchTerm)
	}, [delayedSearch, onSearch, searchTerm])

	const onChangeAntD = (values?: string[]) => {
		const vals = values ? values : []

		if (onChange) onChange(vals)

		setLocalValues(vals)
	}

	let optionalProps = {}

	if (values) optionalProps = { value: values }

	if (values && !onChange) {
		throw new Error('Controlled MultiSelect requires an onChange prop')
	}

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				allowClear={allowClear}
				className={inputClasses}
				defaultValue={defaultValues}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				dropdownRender={menu => (
					<>
						{showSearch && (
							<Input
								classes={[componentClasses.searchBar]}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setSearchTerm(e.target.value)
								}
								onKeyDown={(e: KeyboardEvent) => {
									const keysToNotPropagate: KeyboardEvent['key'][] = [
										'Enter',
										'Backspace'
									]
									if (keysToNotPropagate.includes(e.key))
										e.stopPropagation()
								}}
								placeholder={searchPlaceholder}
							/>
						)}
						{menu}
					</>
				)}
				maxTagCount={maxTagCount}
				maxTagPlaceholder={selectedOpts =>
					`& ${selectedOpts.length} more`
				}
				maxTagTextLength={maxTagTextLength}
				menuItemSelectedIcon={null}
				mode={'multiple'}
				onChange={onChangeAntD}
				optionLabelProp='label'
				placeholder={placeholder}
				showArrow
				showSearch={false}
				{...getDataTestAttributeProp('multi-select', dataTag)}
				{...optionalProps}
				{...popupContainerProps}
			>
				{optionsToMap.map(({ text, value }) => (
					<Option
						className={componentClasses.option}
						key={value}
						label={text}
						value={value}
					>
						<Checkbox
							checked={localValues.indexOf(value) >= 0}
							classes={[componentClasses.checkbox]}
							// eslint-disable-next-line @typescript-eslint/no-empty-function
							onChange={() => {}}
						/>
						<span>{text}</span>
					</Option>
				))}
			</AntDSelect>
		</div>
	)
}
