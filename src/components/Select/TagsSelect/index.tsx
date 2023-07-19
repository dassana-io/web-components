import { BaseSelect } from '../BaseSelect'
import { type TagsSelectProps } from './types'
import { useStyles } from '../MultiSelect/styles'
import React, { type FC } from 'react'

export const TagsSelect: FC<TagsSelectProps> = (props: TagsSelectProps) => {
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
		matchSelectedContentWidth = false,
		onChange,
		options = [],
		optionsConfig = {},
		placeholder = '',
		pending = false,
		popupContainerSelector,
		values
	} = props

	type OnChangeAntD = (vals?: string[]) => void

	const onChangeAntD: OnChangeAntD = (vals = []) => {
		if (onChange) onChange(vals)
	}

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
			error={error}
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
