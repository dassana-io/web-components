import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'
import { TimeInput, TimeInputProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
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

const Template: Story<TimeInputProps> = args => <ThemedTimeInput {...args} />

export const Placeholder = Template.bind({})
Placeholder.args = { placeholder: 'Select time' }
