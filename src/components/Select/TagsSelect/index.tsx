import { BaseSelect } from '../BaseSelect'
import cn from 'classnames'
import { DropdownMenuSpinner } from '../DropdownMenuSpinner'
import { type TagsSelectProps } from './types'
import { useStyles } from '../MultiSelect/styles'
import { v4 as uuidV4 } from 'uuid'
import React, { type FC, type ReactNode, useMemo } from 'react'

export const TagsSelect: FC<TagsSelectProps> = (props: TagsSelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultOpen = false,
		defaultValues = [],
		disabled = false,
		dropdownOnSearchClasses = [],
		dropdownRef,
		error = false,
		filterOption = true,
		focused = false,
		fullWidth = false,
		isSearching = false,
		loading = false,
		matchSelectedContentWidth = false,
		onChange,
		options = [],
		optionsConfig = {},
		placeholder = '',
		pending = false,
		popupContainerSelector,
		values
	} = props

	const dropdownId = useMemo(() => uuidV4(), [])

	type OnChangeAntD = (vals?: string[]) => void

	const onChangeAntD: OnChangeAntD = (vals = []) => {
		if (onChange) onChange(vals)
	}

	const dropdownRender = (menu: ReactNode) => (
		<div key={dropdownId} ref={dropdownRef}>
			{isSearching ? (
				<div className={cn(dropdownOnSearchClasses)}>
					<DropdownMenuSpinner />
				</div>
			) : (
				menu
			)}
		</div>
	)

	let optionalProps = {}

	if (values) optionalProps = { value: values }

	if (values && !onChange) {
		throw new Error('Controlled TagsSelect requires an onChange prop')
	}

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
			filterOption={filterOption}
			focused={focused}
			fullWidth={fullWidth}
			loading={loading}
			matchSelectedContentWidth={matchSelectedContentWidth}
			mode='tags'
			onChange={onChangeAntD}
			options={options}
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
