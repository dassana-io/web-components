import { BaseSelect } from '../BaseSelect'
import cn from 'classnames'
import { DropdownMenuSpinner } from '../DropdownMenuSpinner'
import { type SelectProps } from './types'
import { useStyles } from './utils'
import { v4 as uuidV4 } from 'uuid'
import React, { type FC, type ReactNode, useCallback, useMemo } from 'react'

export const Select: FC<SelectProps> = (props: SelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultOpen = false,
		// defaulting defaultValue to empty string doesn't render a placeholder if a placeholder is provided
		defaultValue,
		disabled = false,
		dropdownOnSearchClasses = [],
		dropdownRef,
		error = false,
		focused = false,
		fullWidth = false,
		isSearching = false,
		loading = false,
		matchSelectedContentWidth = false,
		onChange,
		onDropdownClose,
		onDropdownOpen,
		options,
		optionsConfig = {},
		popupContainerSelector,
		placeholder = '',
		showSearch = false,
		value
	} = props

	const dropdownId = useMemo(() => uuidV4(), [])

	const onDropdownVisibleChange = useCallback(
		(open: boolean) => {
			if (open) {
				onDropdownOpen?.()
			} else {
				onDropdownClose?.()
			}
		},
		[onDropdownClose, onDropdownOpen]
	)

	let controlledCmpProps = {}

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

	if (onChange) {
		controlledCmpProps = {
			onChange,
			value
		}
	}

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	return (
		<BaseSelect
			{...props}
			classes={classes}
			dataTag={dataTag}
			defaultOpen={defaultOpen}
			defaultValue={defaultValue}
			disabled={disabled}
			dropdownRender={dropdownRender}
			error={error}
			focused={focused}
			fullWidth={fullWidth}
			loading={loading}
			matchSelectedContentWidth={matchSelectedContentWidth}
			mode='single'
			onDropdownVisibleChange={onDropdownVisibleChange}
			options={options}
			optionsConfig={optionsConfig}
			placeholder={placeholder}
			popupContainerSelector={popupContainerSelector}
			showSearch={showSearch}
			useStyles={useStyles}
			{...controlledCmpProps}
		/>
	)
}

export * from './types'
