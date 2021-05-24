import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { DateRangeInput, DateRangeInputProps, DateRangeInputValue } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC, useState } from 'react'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		value: { control: { disable: true } }
	},
	component: DateRangeInput,
	title: 'DateRangeInput'
} as Meta

const ThemedDateRangeInput: FC<DateRangeInputProps> = (
	props: DateRangeInputProps
) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<DateRangeInput
			{...props}
			popupContainerSelector={popupContainerSelector}
		/>
	)
}

const Template: Story<DateRangeInputProps> = args => {
	const [value, setValue] = useState<DateRangeInputValue>({
		endTime: 1621374120593,
		startTime: 1620070035963
	})

	return (
		<ThemedDateRangeInput
			{...args}
			onChange={value => {
				console.log(value)
				setValue(value)
			}}
			value={value}
		/>
	)
}

export const Default = Template.bind({})
Default.args = {}
