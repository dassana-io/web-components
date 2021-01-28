import { action } from '@storybook/addon-actions'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TimeInput, TimeInputProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: TimeInput,
	title: 'TimeInput'
} as Meta

const Template: Story<TimeInputProps> = args => <TimeInput {...args} />

export const Placeholder = Template.bind({})
Placeholder.args = { placeholder: 'Select time' }
