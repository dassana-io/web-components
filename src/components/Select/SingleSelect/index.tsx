import { BaseSelect } from '../BaseSelect'
import { type SelectProps } from './types'
import { useStyles } from './utils'
import React, { type FC } from 'react'

export const Select: FC<SelectProps> = (props: SelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultOpen = false,
		// defaulting defaultValue to empty string doesn't render a placeholder if a placeholder is provided
		defaultValue,
		disabled = false,
		error = false,
		focused = false,
		fullWidth = false,
		loading = false,
		matchSelectedContentWidth = false,
		onChange,
		options,
		optionsConfig = {},
		popupContainerSelector,
		placeholder = '',
		showSearch = false,
		value
	} = props

	let controlledCmpProps = {}

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
			error={error}
			focused={focused}
			fullWidth={fullWidth}
			loading={loading}
			matchSelectedContentWidth={matchSelectedContentWidth}
			mode='single'
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
