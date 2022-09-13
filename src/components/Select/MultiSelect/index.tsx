import { BaseSelect } from '../BaseSelect'
import Fuse from 'fuse.js'
import { getSortedAndFilteredValues } from './utils'
import { Input } from '../../Input'
import { MultiSelectProps } from './types'
import { v4 as uuidV4 } from 'uuid'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
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
		dropdownRef,
		error = false,
		focused = false,
		fullWidth = false,
		loading = false,
		maxTagCount,
		maxTagTextLength,
		matchSelectedContentWidth = false,
		onChange,
		onDropdownClose,
		onDropdownOpen,
		onSearch,
		open,
		optionKeysToFilter = ['text'],
		options = [],
		optionsConfig = {},
		placeholder = '',
		pending = false,
		popupContainerSelector,
		searchPlaceholder = '',
		showSearch = false,
		sortOptions = true,
		values
	} = props
	const [localValues, setLocalValues] = useState(values || defaultValues)

	const dropdownId = useMemo(() => uuidV4(), [])

	useEffect(() => {
		if (values) setLocalValues(values)
	}, [values])

	const [searchTerm, setSearchTerm] = useState('')

	const onDropdownVisibleChange = useCallback(
		(open: boolean) => {
			if (open) {
				onDropdownOpen && onDropdownOpen()
			} else {
				onDropdownClose && onDropdownClose()

				setSearchTerm('')
			}
		},
		[onDropdownClose, onDropdownOpen]
	)

	const dropdownClasses = useDropdownStyles(props)

	const dropdownRender = (menu: ReactNode) => (
		<div key={dropdownId} ref={dropdownRef}>
			{showSearch && (
				<Input
					classes={[dropdownClasses.searchBar]}
					fullWidth
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
					value={searchTerm}
				/>
			)}
			{menu}
		</div>
	)

	const fuse = new Fuse(options, {
		findAllMatches: true,
		ignoreLocation: true,
		isCaseSensitive: false,
		keys: optionKeysToFilter,
		shouldSort: true,
		threshold: 0.1
	})

	type OnChangeAntD = (vals?: string[]) => void

	const onChangeAntD: OnChangeAntD = (vals = []) => {
		if (onChange) onChange(vals)

		setLocalValues(vals)
	}

	let optionalProps = {}

	if (values) optionalProps = { value: values }

	if (values && !onChange) {
		throw new Error('Controlled MultiSelect requires an onChange prop')
	}

	const selectOptions = sortOptions
		? getSortedAndFilteredValues({
				fuse,
				localValues,
				onSearch,
				options,
				searchTerm
		  }) // eslint-disable-line no-mixed-spaces-and-tabs
		: options

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
			onDropdownVisibleChange={onDropdownVisibleChange}
			open={open}
			options={selectOptions}
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
