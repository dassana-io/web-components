import 'components/assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import cn from 'classnames'
import Fuse from 'fuse.js'
import { MultiSelectProps } from './types'
import { NoContentFound } from 'components/Select/NoContentFound'
import { OptionChildren } from 'components/Select/OptionChildren'
import { SelectOption } from 'components/Select/SingleSelect/types'
import { SelectSkeleton } from 'components/Select/SingleSelect/SelectSkeleton'
import { Spin } from 'components/Spin'
import { Checkbox, Input } from 'components'
import {
	generatePopupSelector,
	getDataTestAttributeProp
} from 'components/utils'
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { sortOptions, useStyles } from './utils'

const { Option } = AntDSelect

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultValues = [],
		disabled = false,
		error = false,
		loading = false,
		maxTagCount = 2,
		maxTagTextLength = 12,
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

	const filterOptions = (options: SelectOption[], value?: string) => {
		if (!value) {
			return options
		}

		const filteredOptions = fuse
			.search(value)
			.map(
				({ item }: Fuse.FuseResult<SelectOption>): SelectOption => item
			)

		return filteredOptions
	}

	const sortedValues = sortOptions(options, localValues)

	const sortedAndFilteredValues = onSearch
		? sortedValues
		: filterOptions(sortedValues, searchTerm)

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				className={inputClasses}
				defaultValue={defaultValues}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				dropdownRender={menu => (
					<>
						{showSearch && (
							<Input
								classes={[componentClasses.searchBar]}
								onChange={(
									e: ChangeEvent<HTMLInputElement>
								) => {
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
				)}
				maxTagCount={maxTagCount}
				maxTagPlaceholder={selectedOpts =>
					`& ${selectedOpts.length} more`
				}
				maxTagTextLength={maxTagTextLength}
				menuItemSelectedIcon={null}
				mode={'multiple'}
				notFoundContent={
					pending ? (
						<NoContentFound>
							<Spin size={20} />
						</NoContentFound>
					) : (
						<NoContentFound />
					)
				}
				onChange={onChangeAntD}
				optionLabelProp='label'
				placeholder={placeholder}
				showArrow
				showSearch={false}
				{...getDataTestAttributeProp('multi-select', dataTag)}
				{...optionalProps}
				{...popupContainerProps}
			>
				{sortedAndFilteredValues.map(({ iconKey, text, value }) => {
					return (
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
							<OptionChildren
								iconKey={iconKey}
								key={value}
								optionsConfig={optionsConfig}
								text={text}
							/>
						</Option>
					)
				})}
			</AntDSelect>
		</div>
	)
}

export * from './types'
