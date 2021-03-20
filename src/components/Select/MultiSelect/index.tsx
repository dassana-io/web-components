import { BaseSelect } from '../BaseSelect'
import Fuse from 'fuse.js'
import { Input } from '../../Input'
import { MultiSelectProps } from './types'
import { SelectOption } from '../SingleSelect'
import uniqBy from 'lodash/uniqBy'
import { getOptionsFromValues, getSortedAndFilteredValues } from './utils'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	ReactNode,
	useEffect,
	useState
} from 'react'
import { useDropdownStyles, useStyles } from './styles'

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultOpen = false,
		defaultValues = [],
		disabled = false,
		error = false,
		focused = false,
		fullWidth = false,
		loading = false,
		maxTagCount,
		maxTagTextLength,
		matchSelectedContentWidth = false,
		onChange,
		onSearch,
		optionKeysToFilter = ['text'],
		options,
		optionsConfig = {},
		placeholder = '',
		pending = false,
		popupContainerSelector,
		searchPlaceholder = '',
		showSearch = false,
		values
	} = props

	const [localValues, setLocalValues] = useState(values || defaultValues)
	// This is for when options change but values don't (used in dynamic Filters)
	const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

	useEffect(() => {
		if (values) setLocalValues(values)
	}, [values])

	const [searchTerm, setSearchTerm] = useState('')

	const dropdownClasses = useDropdownStyles(props)

	const dropdownRender = (menu: ReactNode) => (
		<>
			{showSearch && (
				<Input
					classes={[dropdownClasses.searchBar]}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						if (onSearch) onSearch(e.target.value)

						setSearchTerm(e.target.value)
					}}
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
	)

	const fuse = new Fuse(options, {
		isCaseSensitive: false,
		keys: optionKeysToFilter,
		shouldSort: true,
		threshold: 0.1
	})

	const onChangeAntD = (values: string[]) => {
		const vals = values ? values : []

		if (onChange) {
			const selectedOpts = uniqBy(
				[...selectedOptions, ...getOptionsFromValues(options, values)],
				'value'
			)
			onChange(vals, selectedOpts)
		}

		setLocalValues(vals)
		setSelectedOptions(getOptionsFromValues(options, vals))
	}

	let optionalProps = {}

	if (values) optionalProps = { value: values }

	if (values && !onChange) {
		throw new Error('Controlled MultiSelect requires an onChange prop')
	}

	const sortedAndFilteredValues = getSortedAndFilteredValues({
		fuse,
		localValues,
		onSearch,
		options,
		searchTerm
	})

	return (
		<BaseSelect
			{...props}
			classes={classes}
			dataTag={dataTag}
			defaultOpen={defaultOpen}
			defaultValue={defaultValues}
			disabled={disabled}
			dropdownRender={dropdownRender}
			error={error}
			focused={focused}
			fullWidth={fullWidth}
			loading={loading}
			localValues={localValues}
			matchSelectedContentWidth={matchSelectedContentWidth}
			maxTagCount={maxTagCount}
			maxTagTextLength={maxTagTextLength}
			mode='multiple'
			onChange={onChangeAntD}
			options={sortedAndFilteredValues}
			optionsConfig={optionsConfig}
			pending={pending}
			placeholder={placeholder}
			popupContainerSelector={popupContainerSelector}
			useStyles={useStyles}
			{...optionalProps}
		/>
	)
}

export * from './types'
