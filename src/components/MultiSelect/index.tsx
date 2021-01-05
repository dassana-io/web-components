import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import cn from 'classnames'
import Fuse from 'fuse.js'
import omit from 'lodash/omit'
import { SelectSkeleton } from '../SharedComponents'
import { Checkbox, Input, Tooltip } from 'components'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'
import { MultiSelectOption, MultiSelectProps } from './types'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	SyntheticEvent,
	useState
} from 'react'
import { sortOptions, useStyles } from './utils'

const { Option } = AntDSelect

interface ShowToolTip {
	[value: string]: boolean
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
		maxTagTextLength = 12,
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
	const [showToolTipList, setShowToolTipList] = useState<ShowToolTip>({})

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

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	const searchFilter = (options: MultiSelectOption[], value: string) => {
		if (value.length === 0) {
			return options
		}

		if (onSearch) {
			onSearch(value)
			return options
		}

		const filteredOptions = fuse
			.search(value)
			.map(
				({
					item
				}: Fuse.FuseResult<MultiSelectOption>): MultiSelectOption =>
					item
			)

		return filteredOptions
	}

	const sortedValues = sortOptions(options, localValues)
	const sortedAndFilteredValues = searchFilter(sortedValues, searchTerm)

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
				{sortedAndFilteredValues.map(({ text, value }) => {
					return (
						<Option
							className={componentClasses.option}
							key={value}
							label={text}
							onMouseEnter={(e: SyntheticEvent) => {
								const el = e.currentTarget.childNodes[0]
								// @ts-ignore
								if (el.scrollWidth > el.offsetWidth) {
									setShowToolTipList({
										...showToolTipList,
										[value]: true
									})
								}
							}}
							onMouseLeave={() =>
								setShowToolTipList({
									...omit(showToolTipList, value)
								})
							}
							value={value}
						>
							<Checkbox
								checked={localValues.indexOf(value) >= 0}
								classes={[componentClasses.checkbox]}
								// eslint-disable-next-line @typescript-eslint/no-empty-function
								onChange={() => {}}
							/>
							{showToolTipList[value] ? (
								<Tooltip
									classes={[componentClasses.tooltip]}
									placement='bottomLeft'
									title={text}
								>
									<span>{text}</span>
								</Tooltip>
							) : (
								<span>{text}</span>
							)}
						</Option>
					)
				})}
			</AntDSelect>
		</div>
	)
}

export * from './types'
