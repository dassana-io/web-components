import { BaseSelect } from '../BaseSelect'
import Fuse from 'fuse.js'
import { Input } from '../../Input'
import { MultiSelectProps } from './types'
import {
	getSortedAndFilteredValues,
	useDropdownStyles,
	useStyles
} from './utils'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	ReactNode,
	useState
} from 'react'

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultValues = [],
		disabled = false,
		error = false,
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

	const sortedAndFilteredValues = getSortedAndFilteredValues({
		fuse,
		localValues,
		onSearch,
		options,
		searchTerm
	})

	return (
		<BaseSelect
			classes={classes}
			dataTag={dataTag}
			defaultValue={defaultValues}
			disabled={disabled}
			dropdownRender={dropdownRender}
			error={error}
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
