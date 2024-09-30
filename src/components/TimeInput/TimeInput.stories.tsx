import { action } from '@storybook/addon-actions'
import { type SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC } from 'react'
import { TimeInput, type TimeInputProps } from './index'

export default {
	argTypes: {
		displayFormat: { control: 'text', defaultValue: 'hh:mm A' },
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		value: { control: { disable: true } }
	},
	component: TimeInput,
	title: 'TimeInput'
} as Meta

const ThemedTimeInput: FC<TimeInputProps> = (props: TimeInputProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<TimeInput popupContainerSelector={popupContainerSelector} {...props} />
	)
}

const Template: StoryFn<TimeInputProps> = args => <ThemedTimeInput {...args} />

export const Placeholder = Template.bind({})
Placeholder.args = { placeholder: 'Select time' }

export const Hours = Template.bind({})
Hours.args = {
	defaultValue: 9,
	format: 'hours'
}

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const Error = Template.bind({})
Error.args = { error: true }
