import { getTimezoneDefaultValue, mappedTimezoneOpts } from './utils'
import React, { FC } from 'react'
import { Select, SelectProps } from 'components/Select'

export interface TimezoneProps
	extends Omit<
		SelectProps,
		'defaultValue' | 'options' | 'optionsConfig' | 'showSearch'
	> {
	format?: string
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
			value={value}
		/>
	)
}
