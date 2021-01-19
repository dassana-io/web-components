import { BaseSelect } from '../BaseSelect'
import { SelectProps } from './types'
import { useStyles } from './utils'
import React, { FC } from 'react'

export const Select: FC<SelectProps> = (props: SelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultOpen = false,
		// defaulting defaultValue to empty string doesn't render a placeholder if a placeholder is provided
		defaultValue,
		disabled = false,
		error = false,
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
			classes={classes}
			dataTag={dataTag}
			defaultOpen={defaultOpen}
			defaultValue={defaultValue}
			disabled={disabled}
			error={error}
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
