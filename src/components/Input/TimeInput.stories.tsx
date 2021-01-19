import { action } from '@storybook/addon-actions'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TimeInput, TimeInputProps } from './TimeInput'

export default {
	argTypes: {
		classes: { control: 'array' },
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: TimeInput,
	title: 'TimeInput'
} as Meta

const Template: Story<TimeInputProps> = args => <TimeInput {...args} />

export const Default = Template.bind({})
