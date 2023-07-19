import { guessUserTimezone } from '@dassana-io/web-utils'
import isNull from 'lodash/isNull'
import { mappedTimezoneOpts } from './utils'
import React, { type ChangeEventHandler, type FC, useEffect } from 'react'
import { Select, type SelectProps } from 'components/Select'

export interface TimezoneProps
	extends Omit<
		SelectProps,
		'defaultValue' | 'onChange' | 'optionsConfig' | 'showSearch' | 'value'
	> {
	onChange?: (value?: string) => void
	format?: string
	// null is so an empty defaultValue can be passed through react-hook-form without console.warnings. If a value is null, the component will guess the timezone
	value?: string | null
}

export const Timezone: FC<TimezoneProps> = ({
	onChange,
	options = mappedTimezoneOpts(),
	value,
	...rest
}: TimezoneProps) => {
	// if value is null and we're guessing the user's tz, then call onChange with the new value
	useEffect(() => {
		if (isNull(value) && onChange) onChange(guessUserTimezone())
	}, [onChange, value])

	return (
		<Select
			{...rest}
			onChange={onChange as unknown as ChangeEventHandler}
			options={options}
			showSearch
			value={isNull(value) ? guessUserTimezone() : value}
		/>
	)
}
