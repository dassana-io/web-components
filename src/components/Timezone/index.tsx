import isNull from 'lodash/isNull'
import { getTimezoneDefaultValue, mappedTimezoneOpts } from './utils'
import React, { FC } from 'react'
import { Select, SelectProps } from 'components/Select'

export interface TimezoneProps
	extends Omit<
		SelectProps,
		'defaultValue' | 'options' | 'optionsConfig' | 'showSearch' | 'value'
	> {
	format?: string
	// null is so an empty defaultValue can be passed through react-hook-form without console.warnings. If a value is null, the component will guess the timezone
	value?: string | null
}

export const Timezone: FC<TimezoneProps> = ({
	value,
	...rest
}: TimezoneProps) => {
	return (
		<Select
			{...rest}
			defaultValue={getTimezoneDefaultValue(value)}
			options={mappedTimezoneOpts()}
			showSearch
			value={isNull(value) ? getTimezoneDefaultValue(value) : value}
		/>
	)
}
