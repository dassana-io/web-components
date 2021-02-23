import isNull from 'lodash/isNull'
import { getTimezoneDefaultValue, mappedTimezoneOpts } from './utils'
import React, { ChangeEventHandler, FC, useEffect } from 'react'
import { Select, SelectProps } from 'components/Select'

export interface TimezoneProps
	extends Omit<
		SelectProps,
		| 'defaultValue'
		| 'options'
		| 'onChange'
		| 'optionsConfig'
		| 'showSearch'
		| 'value'
	> {
	onChange?: (value?: string) => void
	format?: string
	// null is so an empty defaultValue can be passed through react-hook-form without console.warnings. If a value is null, the component will guess the timezone
	value?: string | null
}

export const Timezone: FC<TimezoneProps> = ({
	onChange,
	value,
	...rest
}: TimezoneProps) => {
	// if value is null and we're guessing the user's tz, then call onChange with the new value
	useEffect(() => {
		if (isNull(value) && onChange) onChange(getTimezoneDefaultValue(value))
	}, [onChange, value])

	return (
		<Select
			{...rest}
			onChange={(onChange as unknown) as ChangeEventHandler}
			options={mappedTimezoneOpts()}
			showSearch
			value={isNull(value) ? getTimezoneDefaultValue(value) : value}
		/>
	)
}
